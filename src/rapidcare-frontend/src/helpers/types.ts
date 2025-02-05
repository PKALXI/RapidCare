import {IPatient, IProfileInfo, IAllergy, IPrescription} from "../models/model";


export interface createProfileProps {
  patient: IPatient
  open: boolean;
  setOpen: (open: boolean) => void;
  patientId: string;
  profileInformation: IProfileInfo;
  allergies: IAllergy;
  prescriptions: IPrescription;
}