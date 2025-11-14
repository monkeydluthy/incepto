from typing import List, Optional
from pydantic import BaseModel, Field

class EntityField(BaseModel):
    name: str
    type: str
    required: bool = True
    description: Optional[str] = None

class Entity(BaseModel):
    name: str
    fields: List[EntityField]
    relationships: Optional[List[str]] = None

class ProjectConfig(BaseModel):
    name: str
    description: str
    language: str = Field(..., regex="^(python|typescript|java)$")
    framework: str = Field(..., regex="^(fastapi|express|spring)$")
    entities: Optional[List[Entity]] = None

    def get_template_context(self):
        """Returns a dictionary of template variables"""
        return {
            "project_name": self.name,
            "description": self.description,
            "language": self.language,
            "framework": self.framework,
            "entities": self.entities or []
        } 