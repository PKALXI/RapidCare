import unittest
import requests
import openai
import os

'''
gptAssistance method created using the below docs.
https://platform.openai.com/docs/api-reference
'''

os.environ['OPENAI_API_KEY'] = ""

def gptAssistance(situation, response):
    prompt = f"Given the situation: '{situation}', is the following response relevant? Respond with '1' for relevant and '0' for not appropriate.\nResponse: {response}"

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
    BASE_URL = "http://127.0.0.1:5050"

    def testConfidence(self):
        conversations = [
            'I have a lot of chest pain',
            'I have severe chest tightness and shortness of breath',
            'I have a runny nose and a cough',
            'I have congestion, sore throat and fever',
            'My leg is broken',
            'I have severe pain and swelling in my ankle after a fall',
            'I have soreness in my lower back',
            'My back pain is radiating down my leg with numbness',
            'I have very tight hips',
            'I have hip pain when walking and climbing stairs',
            'My head hurts I have a migraine',
            'I have intense throbbing headache with nausea and light sensitivity',
            'I lost my sense of taste and smell',
            'I have fatigue, loss of smell and taste with body aches'
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

    def testHealthForInvalidInput(self):
        form_data = {
           
        }

        response = requests.post(f"{self.BASE_URL}/predict", data=form_data)
        assert(400 == response.status_code)

if __name__ == "__main__":
    unittest.main()
