import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Modal,
  Box,
  IconButton,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { ISoapNote } from "../../models/model";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { TranscriptionBrokerModule } from "../../api/TranscriptionBrokerModule";
import { addSoap } from "../../firebaseControllers/DatabaseOps";

interface AddSoapNoteProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  patientId: string;
}

const AddSoapNote: React.FC<AddSoapNoteProps> = ({
  open,
  setOpen,
  patientId,
}) => {
  const initialFormData: ISoapNote = {
    id: "",
    date: "",
    practioner: "",
    transcription: "",
    subjective: {
      reason: "",
      hpi: "",
      medicalHistory: "",
      symptoms: "",
      allergies: "",
      currentMedications: "",
    },
    objective: {
      vitals: "",
      physicalExam: "",
      laboratoryData: "",
      imagingResults: "",
      otherData: "",
    },
    assessment: {
      problems: "",
      diagnosis: "",
    },
    plan: "",
    followUp: "",
  };

  const [formData, setNote] = useState<ISoapNote>(initialFormData);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const brokerReference = useRef<TranscriptionBrokerModule | null>(null);
  // const [transcribedText, setTranscribedText] = useState("");

  const dispatch = useDispatch();

  const handleChange = (
    section: "subjective" | "objective" | "assessment" | "base",
    field: string,
    value: string
  ) => {
    setNote((prev) => {
      if (section === "base") {
        return {
          ...prev,
          [field]: value,
        };
      }
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      };
    });
  };

  useEffect(() => {
    // Initialize the broker module
    brokerReference.current = new TranscriptionBrokerModule(
      handleTranscriptionCallback
    );
  }, []);

  // https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API/Using_the_MediaStream_Recording_API
  const startRecording = () => {
    if (!brokerReference.current) return;

    setIsRecording(true);

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: "audio/webm;codecs=opus",
        });
        mediaRecorderRef.current = mediaRecorder;

        let chunks: BlobPart[] = [];

        mediaRecorder.ondataavailable = (event) => {
          chunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(chunks, { type: "audio/webm" });
          brokerReference.current?.transcribeText(audioBlob);
          chunks = [];
        };

        mediaRecorder.start(1000);
      })
      .catch((err) => {
        console.error("Error accessing microphone: ", err);
        toast.error("Failed to access microphone.");
        setIsRecording(false);
      });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
    }
  };

  const handleTranscriptionCallback = useCallback((transcribedText: string) => {
    console.log("WE GOT THE TEXT: " + transcribedText);
    handleChange("base", "transcription", transcribedText);
    brokerReference.current?.diagnosePredictText(transcribedText, setNote);
    brokerReference.current?.classifyPredictText(transcribedText, setNote);
    console.log("DESCRIPTION---: " + transcribedText); // Optionally log the transcription
  }, []);

  const handleSave = () => {
    try {
      // Save in backend
      toast.success("SOAP note saved successfully");
      setOpen(false);

      const soapCopy = { ...formData };
      soapCopy.id = uuidv4();

      addSoap(patientId, soapCopy);
      setNote(initialFormData);
    } catch (error) {
      toast.error("Failed to save SOAP note");
      console.error(error);
    }
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box className="w-3/4 mx-auto my-10 bg-white p-4 rounded relative max-h-[85vh] flex flex-col">
        <Box className="flex justify-between items-center p-2">
          <Typography variant="h6">New SOAP Note</Typography>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box className="overflow-y-auto flex-grow max-h-[70vh] p-2 space-y-2">
          <Box className="p-2">
            <Typography variant="h6" gutterBottom>
              Transcribed Text
            </Typography>
            <CardContent>
              <Typography variant="body1" component="p">
                {formData.transcription}
              </Typography>
            </CardContent>
          </Box>
          <Card className="p-2">
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    name="date"
                    label="Date"
                    fullWidth
                    value={formData.date}
                    onChange={(e) =>
                      handleChange("base", "date", e.target.value)
                    }
                    type="date"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="practioner"
                    label="Practitioner"
                    fullWidth
                    value={formData.practioner}
                    onChange={(e) =>
                      handleChange("base", "practioner", e.target.value)
                    }
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card className="p-2">
            <Typography variant="h6" gutterBottom>
              Subjective
            </Typography>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="reason"
                    fullWidth
                    label="Reason for visit"
                    value={formData.subjective.reason}
                    onChange={(e) =>
                      handleChange("subjective", "reason", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="hpi"
                    fullWidth
                    label="History of Presenting Illness"
                    value={formData.subjective.hpi}
                    onChange={(e) =>
                      handleChange("subjective", "hpi", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="medicalHistory"
                    fullWidth
                    label="Past Medical History"
                    multiline
                    rows={3}
                    value={formData.subjective.medicalHistory}
                    onChange={(e) =>
                      handleChange(
                        "subjective",
                        "medicalHistory",
                        e.target.value
                      )
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="symptoms"
                    fullWidth
                    label="Review of Systems"
                    multiline
                    rows={3}
                    value={formData.subjective.symptoms}
                    onChange={(e) =>
                      handleChange("subjective", "symptoms", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="allergies"
                    fullWidth
                    label="Allergies"
                    multiline
                    rows={3}
                    value={formData.subjective.allergies}
                    onChange={(e) =>
                      handleChange("subjective", "allergies", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="currentMedications"
                    fullWidth
                    label="Current Medications"
                    multiline
                    rows={3}
                    value={formData.subjective.currentMedications}
                    onChange={(e) =>
                      handleChange(
                        "subjective",
                        "currentMedications",
                        e.target.value
                      )
                    }
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card className="p-2">
            <Typography variant="h6" gutterBottom>
              Objective
            </Typography>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    name="vitals"
                    fullWidth
                    label="Vital Signs"
                    multiline
                    rows={3}
                    value={formData.objective.vitals}
                    onChange={(e) =>
                      handleChange("objective", "vitals", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="physicalExam"
                    fullWidth
                    label="Physical Exam"
                    multiline
                    rows={3}
                    value={formData.objective.physicalExam}
                    onChange={(e) =>
                      handleChange("objective", "physicalExam", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="laboratoryData"
                    fullWidth
                    label="Laboratory Data"
                    multiline
                    rows={3}
                    value={formData.objective.laboratoryData}
                    onChange={(e) =>
                      handleChange(
                        "objective",
                        "laboratoryData",
                        e.target.value
                      )
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="imagingResults"
                    fullWidth
                    label="Imaging Results"
                    multiline
                    rows={3}
                    value={formData.objective.imagingResults}
                    onChange={(e) =>
                      handleChange(
                        "objective",
                        "imagingResults",
                        e.target.value
                      )
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="otherData"
                    fullWidth
                    label="Other Data"
                    multiline
                    rows={3}
                    value={formData.objective.otherData}
                    onChange={(e) =>
                      handleChange("objective", "otherData", e.target.value)
                    }
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card className="p-2">
            <Typography variant="h6" gutterBottom>
              Assessment
            </Typography>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    name="problems"
                    fullWidth
                    label="Problems Identified"
                    multiline
                    rows={3}
                    value={formData.assessment.problems}
                    onChange={(e) =>
                      handleChange("assessment", "problems", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="diagnosis"
                    fullWidth
                    label="Diagnosis"
                    multiline
                    rows={3}
                    value={formData.assessment.diagnosis}
                    onChange={(e) =>
                      handleChange("assessment", "diagnosis", e.target.value)
                    }
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card className="p-2">
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="plan"
                    fullWidth
                    label="Plan"
                    multiline
                    rows={3}
                    value={formData.plan}
                    onChange={(e) =>
                      handleChange("base", "plan", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="followUp"
                    fullWidth
                    label="Follow-up"
                    multiline
                    rows={3}
                    value={formData.followUp}
                    onChange={(e) =>
                      handleChange("base", "followUp", e.target.value)
                    }
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>

        <Box className="flex justify-between px-16 sticky bottom-0">
          {isRecording ? (
            <Button variant="contained" color="error" onClick={stopRecording}>
              Stop Recording
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={startRecording}
            >
              Start Recording
            </Button>
          )}
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddSoapNote;
