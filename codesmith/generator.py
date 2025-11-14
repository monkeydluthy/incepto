import os
from pathlib import Path
import shutil
from typing import Dict, List

from jinja2 import Environment, FileSystemLoader
import openai
from rich.console import Console

from .models import ProjectConfig, Entity

console = Console()

class ProjectGenerator:
    def __init__(self, config: ProjectConfig):
        self.config = config
        self.template_dir = Path(__file__).parent / "templates"
        self.env = Environment(loader=FileSystemLoader(str(self.template_dir)))
        
        # Initialize OpenAI client if API key is available
        self.openai_client = None
        if os.getenv("OPENAI_API_KEY"):
            self.openai_client = openai.OpenAI()

    def generate(self):
        """Generate the project scaffold"""
        # Create project directory
        project_dir = Path(self.config.name)
        project_dir.mkdir(exist_ok=True)

        # Generate domain entities if not provided
        if not self.config.entities and self.openai_client:
            self.config.entities = self._generate_domain_entities()

        # Generate project structure based on framework
        if self.config.framework == "fastapi":
            self._generate_fastapi_project(project_dir)
        elif self.config.framework == "express":
            self._generate_express_project(project_dir)
        elif self.config.framework == "spring":
            self._generate_spring_project(project_dir)

    def _generate_domain_entities(self) -> List[Entity]:
        """Generate domain entities using OpenAI"""
        if not self.openai_client:
            console.print("[yellow]Warning: OpenAI API key not found. Skipping entity generation.[/yellow]")
            return []

        prompt = f"""
        Based on this application description: "{self.config.description}"
        Generate a JSON array of domain entities with their fields and relationships.
        Each entity should have:
        - name: The entity name in PascalCase
        - fields: Array of fields with name, type, and required status
        - relationships: Array of related entity names
        """

        try:
            response = self.openai_client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.7,
            )
            # Parse the response and convert to Entity objects
            # This is a simplified version - you'd need to add proper JSON parsing
            return []
        except Exception as e:
            console.print(f"[yellow]Warning: Could not generate entities: {str(e)}[/yellow]")
            return []

    def _generate_fastapi_project(self, project_dir: Path):
        """Generate FastAPI project structure"""
        # Create directory structure
        (project_dir / "app").mkdir(exist_ok=True)
        (project_dir / "app/api").mkdir(exist_ok=True)
        (project_dir / "app/models").mkdir(exist_ok=True)
        (project_dir / "app/services").mkdir(exist_ok=True)
        (project_dir / "tests").mkdir(exist_ok=True)

        # Generate files from templates
        self._render_template("fastapi/main.py.j2", project_dir / "app/main.py")
        self._render_template("fastapi/models.py.j2", project_dir / "app/models/__init__.py")
        self._render_template("fastapi/requirements.txt.j2", project_dir / "requirements.txt")
        self._render_template("fastapi/dockerfile.j2", project_dir / "Dockerfile")

    def _generate_express_project(self, project_dir: Path):
        """Generate Express.js project structure"""
        # Create directory structure
        (project_dir / "src").mkdir(exist_ok=True)
        (project_dir / "src/routes").mkdir(exist_ok=True)
        (project_dir / "src/models").mkdir(exist_ok=True)
        (project_dir / "src/controllers").mkdir(exist_ok=True)
        (project_dir / "tests").mkdir(exist_ok=True)

        # Generate files from templates
        self._render_template("express/package.json.j2", project_dir / "package.json")
        self._render_template("express/app.ts.j2", project_dir / "src/app.ts")
        self._render_template("express/tsconfig.json.j2", project_dir / "tsconfig.json")

    def _generate_spring_project(self, project_dir: Path):
        """Generate Spring Boot project structure"""
        # Create directory structure
        base_package_dir = project_dir / "src/main/java/com/example/demo"
        base_package_dir.mkdir(parents=True, exist_ok=True)
        (project_dir / "src/main/resources").mkdir(parents=True, exist_ok=True)
        (project_dir / "src/test/java").mkdir(parents=True, exist_ok=True)

        # Generate files from templates
        self._render_template("spring/pom.xml.j2", project_dir / "pom.xml")
        self._render_template("spring/application.properties.j2", 
                            project_dir / "src/main/resources/application.properties")

    def _render_template(self, template_path: str, output_path: Path):
        """Render a template file"""
        try:
            template = self.env.get_template(template_path)
            content = template.render(**self.config.get_template_context())
            output_path.write_text(content)
        except Exception as e:
            console.print(f"[yellow]Warning: Could not render template {template_path}: {str(e)}[/yellow]") 