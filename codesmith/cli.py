import click
from rich.console import Console
from rich.panel import Panel

from .generator import ProjectGenerator
from .models import ProjectConfig

console = Console()

@click.group()
def cli():
    """CodeSmith - Domain-aware code scaffolding tool"""
    pass

@cli.command()
@click.option('--name', prompt='Project name', help='Name of the project')
@click.option('--description', prompt='Project description', 
              help='Brief description of your application domain (e.g., e-commerce, CRM, IoT dashboard)')
@click.option('--language', prompt='Programming language',
              type=click.Choice(['python', 'typescript', 'java']), 
              help='Primary programming language for the project')
@click.option('--framework', prompt='Framework',
              type=click.Choice(['fastapi', 'express', 'spring']),
              help='Web framework to use')
def create(name: str, description: str, language: str, framework: str):
    """Create a new project scaffold based on domain description"""
    try:
        config = ProjectConfig(
            name=name,
            description=description,
            language=language,
            framework=framework
        )
        
        generator = ProjectGenerator(config)
        generator.generate()
        
        console.print(Panel.fit(
            f"✨ Successfully created project: {name}\n"
            f"📁 Framework: {framework}\n"
            f"🔧 Language: {language}\n",
            title="CodeSmith",
            border_style="green"
        ))
        
    except Exception as e:
        console.print(f"[red]Error: {str(e)}[/red]")

def main():
    cli() 