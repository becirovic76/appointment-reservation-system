# UML Diagrams (PlantUML)

Analysis and Software Design seminar — **Appointment Reservation System**

All diagrams are derived from the implemented codebase (Clean Architecture, Node.js/Express, SQLite, HTML/CSS/JS frontend).

## Files

| File | Diagram Type |
|------|----------------|
| `UseCaseDiagram.puml` | Use Case (entire system) |
| `DomainModel.puml` | Domain Model (conceptual) |
| `SystemSequenceDiagram.puml` | System Sequence (overview) |
| `ClassDiagram.puml` | Class (full implementation) |
| `ReservationSequenceDiagram.puml` | Sequence — Create Reservation |
| `ReservationCommunicationDiagram.puml` | Communication — Create Reservation |
| `ReservationStateDiagram.puml` | State — Reservation entity |
| `ReservationActivityDiagram.puml` | Activity — Create Reservation |
| `ComponentDiagram.puml` | Component (entire system) |
| `DeploymentDiagram.puml` | Deployment (entire system) |

## How to render

### VS Code / Cursor
Install extension **PlantUML**, then open any `.puml` file and press `Alt+D` to preview.

### Online
Copy file contents to https://www.plantuml.com/plantuml/uml/

### Command line
```bash
java -jar plantuml.jar docs/uml/*.puml
```

Requires [PlantUML](https://plantuml.com/) and Graphviz.

## Source of truth

Diagrams reflect:
- `backend/src/domain/` — entities & enums
- `backend/src/application/` — services & interfaces
- `backend/src/infrastructure/repositories/` — persistence
- `backend/src/api/` — controllers, routes, middleware
- `frontend/js/` — api.js, auth.js, app.js
- `backend/database/schema.sql` — persistence model
