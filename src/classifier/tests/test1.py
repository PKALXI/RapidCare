import unittest
import requests
import openai
import os

'''
gptAssistance method created using the below docs.
https://platform.openai.com/docs/api-reference
https://docs.python.org/3/library/unittest.html 
'''


def gptAssistance(situation, response):
    prompt = f"Given the raw conversation: '{situation}', is the following response correctly extracting the symptom, reason_for_visit, allergies, current_medication from the raw conversion? Respond with '1' for relevant and '0' for not correctly extracted.\nResponse: {response}"

    client = openai.OpenAI()
    result = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are evaluator to check if a doctor is giving an relevant plan for a patient."},
            {"role": "user", "content": prompt}
        ]
    )

    evaluation = result.choices[0].message.content.strip()
    
    return int(evaluation)


class TestAPI(unittest.TestCase):
    BASE_URL = "http://127.0.0.1:5080"

    def testConfidence(self):
        conversations = [
            "Conversation: I have a lot of chest pain. Medications: Nitroglycerin (for potential angina), Aspirin (antiplatelet). Allergies: Penicillin. Current Medication: Lisinopril (blood pressure).",
            "Conversation: I have severe chest tightness and shortness of breath. Medications: Albuterol (bronchodilator), Aspirin. Allergies: Sulfa drugs. Current Medication: Metformin (diabetes).",
            "Conversation: I have a runny nose and a cough. Medications: Pseudoephedrine (decongestant), Dextromethorphan (cough suppressant). Allergies: None known. Current Medication: Multivitamin.",
            "Conversation: I have congestion, sore throat and fever. Medications: Acetaminophen (fever reducer/pain reliever), Ibuprofen (anti-inflammatory). Allergies: Aspirin. Current Medication: Vitamin C.",
            "Conversation: My leg is broken. Medications: Ibuprofen (pain relief), Acetaminophen. Allergies: Codeine. Current Medication: Calcium supplement.",
            "Conversation: I have severe pain and swelling in my ankle after a fall. Medications: Naproxen (anti-inflammatory), Acetaminophen. Allergies: Latex. Current Medication: Fish oil.",
            "Conversation: I have soreness in my lower back. Medications: Ibuprofen, Muscle relaxant (e.g., cyclobenzaprine). Allergies: Shellfish. Current Medication: Glucosamine.",
            "Conversation: My back pain is radiating down my leg with numbness. Medications: Gabapentin (nerve pain), Ibuprofen. Allergies: NSAIDs (general). Current Medication: Vitamin D.",
            "Conversation: I have very tight hips. Medications: Ibuprofen, Topical pain relief (e.g., menthol cream). Allergies: Pollen. Current Medication: Magnesium.",
            "Conversation: I have hip pain when walking and climbing stairs. Medications: Naproxen, Acetaminophen. Allergies: Dust mites. Current Medication: CoQ10.",
            "Conversation: My head hurts I have a migraine. Medications: Sumatriptan (triptan), Ibuprofen. Allergies: MSG. Current Medication: B complex vitamins.",
            "Conversation: I have intense throbbing headache with nausea and light sensitivity. Medications: Rizatriptan (triptan), Metoclopramide (anti-nausea). Allergies: Dairy. Current Medication: Melatonin.",
            "Conversation: I lost my sense of taste and smell. Medications: Zinc lozenges, Vitamin D. Allergies: Soy. Current Medication: Probiotic.",
            "Conversation: I have fatigue, loss of smell and taste with body aches. Medications: Acetaminophen, Vitamin C. Allergies: Gluten. Current Medication: Iron supplement."
        ]

        success = 0

        for i, conversation in enumerate(conversations):
            print(f'Iteration: {i + 1}')
            form_data = {
                "transcription": conversation
            }

            response = requests.post(f"{self.BASE_URL}/predict", data=form_data)

            if response.status_code == 200:
                evaluationScore = gptAssistance(conversation, response.json())
                if evaluationScore == 1:
                    success += 1
                    print('-----Success------')


        print(f'Test 1 Score (Confidence): {success/6}')
        assert((success/6) >= 0.85)                

    
    def testValidInput(self):
        form_data = {
            "transcription": "I have a lot of chest pain, sometimes shortness of breath."
        }

        response = requests.post(f"{self.BASE_URL}/predict", data=form_data)
        assert(200 == response.status_code)

    def testHealthForValidInput(self):
        form_data = {
           
        }

        response = requests.post(f"{self.BASE_URL}/predict", data=form_data)
        assert(400 == response.status_code)

if __name__ == "__main__":
    unittest.main()
