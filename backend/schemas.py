from pydantic import BaseModel, Field
from typing import List, Dict

class DecisionInput(BaseModel):
    decision: str
    options: List[str]
    pros: Dict[str, List[str]]
    cons: Dict[str, List[str]]
    priorities: List[str]
    risk_tolerance: str = Field(..., pattern="^(low|medium|high)$")


class DecisionResult(BaseModel):
    recommended_option: str
    confidence_score: int = Field(..., ge=0, le=100)
    reasoning: str
    risks: List[str]
    alternative: str
