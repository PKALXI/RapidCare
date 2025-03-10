package com.rapidcare.api.controllers;
import com.rapidcare.api.services.ClassifyTextService;
import com.rapidcare.api.services.VoiceToTextService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JsonParser;
import org.springframework.boot.json.JsonParserFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class APIController {
    @Autowired
    private VoiceToTextService voiceToTextService;
    @Autowired
    private ClassifyTextService classifyTextService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/transcribeText")
    public ResponseEntity<Map<String, Object>> transcribeText(){
        try{
            Map<String, Object> responseData = Map.of(
                    "classifiedData", "classifiedData",
                    "transcribedText", "plainText"
            );

            return ResponseEntity.status(HttpStatus.ACCEPTED).body(responseData);
        } catch(Exception e){
            Map <String, Object> response = new HashMap<>();
            response.put("response", "Backend error has occurred");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }

    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/classifyText")
    public ResponseEntity<Map<String, Object>> classifyData(@RequestParam("transcribedText") String fields) {
        try {
            //Store a temp file
            String filePath = "C:\\Users\\prana\\Downloads\\test.wav"; // Specify your desired save path
            File savedFile = new File(filePath);
            file.transferTo(savedFile);

            String resp = voiceToTextService.hitVoicetoText(savedFile);
            JsonParser jsonParser = JsonParserFactory.getJsonParser();
            Map <String, Object> response = jsonParser.parseMap(resp);

            String plainText = String.valueOf(response.get("resp"));

            String classifiedResp = classifyTextService.classifyData(fields, plainText);
            Map<String, Object> classifiedData = jsonParser.parseMap(classifiedResp);

            System.out.println("------------" + classifiedResp);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(responseData);
        } catch (IOException e) {
            Map <String, Object> response = new HashMap<>();
            response.put("response", "Backend error has occurred");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/heartbeat")
    public String isUp(){
        String resp = classifyTextService.classifyData("fields", "context");
        return resp;
    }
}
