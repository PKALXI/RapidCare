package com.rapidcare.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class ClassifyTextService {
    @Value("${services.clft}")
    private String clftServiceRoute;

    @Autowired
    private RestTemplate restTemplate;

    public String classifyData(String fields, String context){
        String url = "http://127.0.0.1:5050/classify_text";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        Map<String, String> bodyPayload = new HashMap<>();
        bodyPayload.put("fields", fields);
        bodyPayload.put("context", context);

        HttpEntity<Map<String, String>> request = new HttpEntity<>(bodyPayload, headers);

        ResponseEntity<String> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                request,
                String.class
        );

        return response.getBody();
//        return "True";
    }
}
