from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas import DecisionInput, DecisionResult
from agent import agent
import json

app = FastAPI(title="Decision Companion AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze-decision", response_model=DecisionResult)
async def analyze_decision(data: DecisionInput):
    try:
        result = await agent.run(data.model_dump())

        # Agent returns text → parse JSON
        parsed = json.loads(result.output_text)

        return DecisionResult(**parsed)

    except json.JSONDecodeError:
        raise HTTPException(
            status_code=500,
            detail="AI response was not valid JSON"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/")
def health():
    return {"status": "Backend running"}
