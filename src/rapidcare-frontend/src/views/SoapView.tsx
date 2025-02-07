import React, {useState} from 'react';
import {IPatient, ISoapNote} from "../models/model";
import { useDispatch } from 'react-redux';
import { Card, CardContent, CardHeader, Typography, Modal, Box, IconButton, Button, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from '@mui/material';


interface SoapNotesProps {
  patient: IPatient;
}

const SoapView: React.FC<SoapNotesProps> = ({ patient }) => {

  const [isRecording, setIsRecording] = useState(false);
  const consultationNotes = patient.consultationNotes || [];
  const [selectedNote, setSelectedNote] = useState<ISoapNote | null>(null);
  const [openNote, setOpenNote] = useState(false); 
  const [openSoapNote, setOpenSoapNote] = useState(false);

  const handleRecording = () => {
        setIsRecording(prevState => !prevState);
    };

    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          const { name, value } = event.target;
          setFormData({...formData, [name]: value });
    };

    const handleOpenNote = (note: ISoapNote) => {
            setSelectedNote(note);
            setOpenNote(true);
        };
    
    /*const handleSave = () => {
          setErrors({});
               
          dispatch(addSoapNote(patient));
          setOpen(false);
        }*/

    const handleCloseNote = () => {
      setOpenNote(false);
      setSelectedNote(null);
  };

    const handleButtonClick = (action: string) => {
      console.log(`${action} button clicked`);
    };

    return (    
        <div className="col-span-2 m-10"> 
         <div className="bg-gray-50 p-6 rounded shadow"> 
          <div className="flex justify-between mb-6">
            <div className="bg-gray-50 p-6 rounded shadow flex justify-between sticky top-0 z-10"> 
              <button 
                className={`px-4 py-2 rounded w-48 ${isRecording ? 'bg-red-500' : 'bg-green-500'} text-white`} 
                onClick={handleRecording}
            >
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </button>
            </div>
            <div className="sticky top-0 bg-gray-50 z-10 p-4 shadow-md">
              <div className="flex flex-col items-center space-x-10"> 
                <h2 className="absolute top-1/2 left-1/2 transform -translate-x-[150%] -translate-y-[400%] font-bold text-lg">SOAP Note</h2>
                  <div className="w-3/4">
                    <div className="flex items-center mb-4"> <p className='mr-4'><strong>Practitioner:</strong></p>
                      <textarea className="w-96 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                    </div>
                    <div className="flex items-center mb-4"> <p className='mr-4'><strong>Date:</strong></p>
                      <textarea className="w-96 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                    </div>
                  </div>
              </div> 
          </div>
        </div>
      </div>

        <Modal open={openNote} onClose={handleCloseNote}>
                        <Box className= "w-3/4 mx-auto my-10 bg-white p-4 rounded relative max-h-[85vh] overflow-y-auto">
                        {selectedNote && (
                        <div className="max-h-[60vh] overflow-y-auto p-4">
                          <Card>
                              <CardContent>
                                  <Typography variant="h6" gutterBottom>Subjective Assessment</Typography>
                                  <Grid container spacing={2}>
                                      <Grid item xs={4} md={3}><Typography variant="body2">Symptoms:</Typography></Grid>
                                      <Grid item xs={8} md={9}>
                                        <TextField
                                          fullWidth
                                          multiline
                                          rows={2}
                                          variant="outlined"
                                          placeholder="Enter symptoms.."
                                          name="symptoms"
                                          onChange={handleInputChange}
                                          value={selectedNote.subjectiveAssesment.symptoms}
                                        />
                                      </Grid>

                                      <Grid item xs={4} md={3}><Typography variant="body2">Allergies:</Typography></Grid>
                                      <Grid item xs={8} md={9}>
                                        <TextField
                                          fullWidth
                                          multiline
                                          rows={2}
                                          variant="outlined"
                                          placeholder="Enter allergies.."
                                          name="allergies"
                                          onChange={handleInputChange}
                                          value={selectedNote.subjectiveAssesment.allergies}
                                        />
                                      </Grid>
                                      <Grid item xs={4} md={3}><Typography variant="body2">Medications:</Typography></Grid>
                                      <Grid item xs={8} md={9}>
                                        <TextField
                                          fullWidth
                                          multiline
                                          rows={2}
                                          variant="outlined"
                                          placeholder="Enter medications.."
                                          name="medications"
                                          onChange={handleInputChange}
                                          value={selectedNote.subjectiveAssesment.medications}
                                        />
                                      </Grid>
                                      <Grid item xs={4} md={3}><Typography variant="body2" >Medical History:</Typography></Grid>
                                      <Grid item xs={8} md={9}>
                                        <TextField
                                          fullWidth
                                          multiline
                                          rows={2}
                                          variant="outlined"
                                          placeholder="Enter medical history.."
                                          name="medical history"
                                          onChange={handleInputChange}
                                          value={selectedNote.subjectiveAssesment.medicalHistory}
                                        />
                                      </Grid>

                                      <Grid item xs={4} md={3}><Typography variant="body2">Last Meal:</Typography></Grid>
                                      <Grid item xs={8} md={9}>
                                        <TextField
                                          fullWidth
                                          multiline
                                          rows={2}
                                          variant="outlined"
                                          placeholder="Enter last meal.."
                                          name="last meal"
                                          onChange={handleInputChange}
                                          value={selectedNote.subjectiveAssesment.lastMeal}
                                        />
                                      </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>

                                <Card>
                                  <CardContent>
                                      <Typography variant="h6" gutterBottom>Objective Assessment</Typography>
                                      <Grid container spacing={2}>
                                          <Grid item xs={4} md={3}><Typography variant="body2">Breathing:</Typography></Grid>
                                          <Grid item xs={8} md={9}>
                                            <TextField
                                              fullWidth
                                              multiline
                                              rows={2}
                                              variant="outlined"
                                              placeholder="Enter breathing.."
                                              name="breathing"
                                              onChange={handleInputChange}
                                              value={selectedNote.objectiveAssessment.breathing}
                                            />
                                          </Grid>

                                          <Grid item xs={4} md={3}><Typography variant="body2">Circulation:</Typography></Grid>
                                          <Grid item xs={8} md={9}>
                                            <TextField
                                              fullWidth
                                              multiline
                                              rows={2}
                                              variant="outlined"
                                              placeholder="Enter circulation.."
                                              name="circulation"
                                              onChange={handleInputChange}
                                              value={selectedNote.objectiveAssessment.circulation}
                                            />
                                          </Grid>
                                          <Grid item xs={4} md={3}><Typography variant="body2">Skin type:</Typography></Grid>
                                          <Grid item xs={8} md={9}>
                                            <TextField
                                              fullWidth
                                              multiline
                                              rows={2}
                                              variant="outlined"
                                              placeholder="Enter skin type.."
                                              name="skin type"
                                              onChange={handleInputChange}
                                              value={selectedNote.objectiveAssessment.skinType}
                                            />
                                          </Grid>
                                          <Grid item xs={4} md={3}><Typography variant="body2" >Head-to-Toe check:</Typography></Grid>
                                          <Grid item xs={8} md={9}>
                                            <TextField
                                              fullWidth
                                              multiline
                                              rows={2}
                                              variant="outlined"
                                              placeholder="Enter head-to-toe check.."
                                              name="head-to-toe check"
                                              onChange={handleInputChange}
                                              value={selectedNote.objectiveAssessment.headToToeCheck}
                                            />
                                          </Grid>

                                          <Grid item xs={4} md={3}><Typography variant="body2">Level of consciousness:</Typography></Grid>
                                          <Grid item xs={8} md={9}>
                                            <TextField
                                              fullWidth
                                              multiline
                                              rows={2}
                                              variant="outlined"
                                              placeholder="Enter consciousness.."
                                              name="consciousness"
                                              onChange={handleInputChange}
                                              value={selectedNote.objectiveAssessment.levelOfConsciousness}
                                            />
                                          </Grid>
                                            </Grid>
                                        </CardContent>
                                </Card>

                                <Card>
                                  <CardContent>
                                      <Typography variant="h6" gutterBottom>Assessment Summary</Typography>
                                      <Grid container spacing={2}>
                                          <Grid item xs={8} md={9}>
                                            <TextField
                                              fullWidth
                                              multiline
                                              rows={2}
                                              variant="outlined"
                                              placeholder="Enter Summary.."
                                              name="summary"
                                              onChange={handleInputChange}
                                              value={selectedNote.summary}
                                            />
                                          </Grid>
                                        </Grid>
                                      </CardContent>
                                    </Card>

                                    <Card>
                                  <CardContent>
                                      <Typography variant="h6" gutterBottom>Plan</Typography>
                                      <Grid container spacing={2}>
                                          <Grid item xs={8} md={9}>
                                            <TextField
                                              fullWidth
                                              multiline
                                              rows={2}
                                              variant="outlined"
                                              placeholder="Enter plan.."
                                              name="plan"
                                              onChange={handleInputChange}
                                              value={selectedNote.plan}
                                            />
                                          </Grid>
                                        </Grid>
                                      </CardContent>
                                    </Card>
                            </div>
                        )}
                          </Box>
                        </Modal>

            <div className="sticky bottom-0 bg-white p-4 shadow-md flex justify-between">
              <button className="bg-green-500 text-white px-4 py-2 rounded">Edit Note</button>
              <button className="bg-red-500 text-center px-4 py-2 rounded" onClick={() => handleButtonClick('Save Note')}>Save Note</button>
          </div>
        </div>     
    );
};
export default SoapView