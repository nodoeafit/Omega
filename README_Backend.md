# Omega Backend - Spring Boot

Backend para la plataforma Omega de NODO EAFIT, desarrollado con Spring Boot.

## 📋 Requisitos Previos

- Java 17 o superior
- Maven 3.6+
- MySQL 8.0+
- IDE (IntelliJ IDEA, Eclipse, VS Code)

## 🚀 Instalación y Configuración

### 1. Clonar el proyecto
```bash
git clone <url-del-repositorio>
cd omega-backend
```

### 2. Configurar la base de datos

#### Crear la base de datos MySQL:
```sql
CREATE DATABASE omega_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### Ejecutar el script de inicialización:
```bash
mysql -u root -p omega_db < database_schema.sql
```

### 3. Configurar las credenciales de la base de datos

Editar el archivo `src/main/resources/application.properties`:
```properties
spring.datasource.username=tu_usuario
spring.datasource.password=tu_password
```

### 4. Compilar y ejecutar el proyecto

```bash
# Compilar el proyecto
mvn clean compile

# Ejecutar el proyecto
mvn spring-boot:run
```

El servidor estará disponible en: `http://localhost:8080`

## 📁 Estructura del Proyecto

```
src/main/java/com/nodo/eafit/omega/
├── OmegaApplication.java          # Clase principal
├── entity/                        # Entidades JPA
│   ├── Course.java
│   ├── CourseContent.java
│   ├── Unit.java
│   └── Resource.java
├── repository/                    # Repositorios
│   ├── CourseRepository.java
│   ├── CourseContentRepository.java
│   ├── UnitRepository.java
│   └── ResourceRepository.java
├── service/                       # Servicios
│   ├── CourseService.java
│   └── CourseContentService.java
├── controller/                    # Controladores REST
│   ├── CourseController.java
│   └── CourseContentController.java
└── dto/                          # DTOs
    └── CourseDTO.java
```

## 🔌 Endpoints de la API

### Cursos (Courses)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/courses` | Obtener todos los cursos |
| GET | `/api/courses/{id}` | Obtener curso por ID |
| POST | `/api/courses` | Crear nuevo curso |
| PUT | `/api/courses/{id}` | Actualizar curso |
| DELETE | `/api/courses/{id}` | Eliminar curso |
| GET | `/api/courses/search?title={title}` | Buscar cursos por título |
| GET | `/api/courses/modality/{modality}` | Obtener cursos por modalidad |
| GET | `/api/courses/price-range?minPrice={min}&maxPrice={max}` | Obtener cursos por rango de precio |
| GET | `/api/courses/sort/price-asc` | Cursos ordenados por precio ascendente |
| GET | `/api/courses/sort/price-desc` | Cursos ordenados por precio descendente |
| GET | `/api/courses/sort/title` | Cursos ordenados por título |

### Contenido de Cursos (Course Content)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/course-content/name/{courseName}` | Obtener contenido por nombre del curso |
| GET | `/api/course-content/{id}` | Obtener contenido por ID |
| POST | `/api/course-content` | Crear nuevo contenido |
| PUT | `/api/course-content/{id}` | Actualizar contenido |
| DELETE | `/api/course-content/{id}` | Eliminar contenido |
| GET | `/api/course-content/search?courseName={name}` | Buscar contenido por nombre |
| GET | `/api/course-content/{id}/units` | Obtener unidades de un curso |

## 📊 Modelo de Datos

### Course
```json
{
  "id": 1,
  "title": "PROCESAMIENTO DE DATOS",
  "imageUrl": "assets/images/procesamiento-de-datos.jpg",
  "modality": "VIRTUAL",
  "certification": "Certificación virtual",
  "duration": "3 Meses / 12 Semanas - 72 horas sincrónicas...",
  "description": "¡Fortalece tu potencial con nuestro curso...",
  "price": 2700000.0
}
```

### CourseContent
```json
{
  "id": 1,
  "courseName": "IA PARA TODOS",
  "units": [
    {
      "id": 1,
      "unitNumber": 1,
      "resources": [
        {
          "id": 1,
          "resourceName": "¿Qué verás en este curso?",
          "link": "https://view.genially.com/...",
          "embed": "<div style=\"width: 100%;\">..."
        }
      ]
    }
  ]
}
```

## 🔧 Configuración de Desarrollo

### Variables de entorno recomendadas:
```properties
# Base de datos
DB_HOST=localhost
DB_PORT=3306
DB_NAME=omega_db
DB_USER=root
DB_PASSWORD=password

# Servidor
SERVER_PORT=8080
SERVER_CONTEXT_PATH=/api

# Logging
LOG_LEVEL=DEBUG
```

### Configuración de CORS:
El backend está configurado para aceptar peticiones desde cualquier origen (`*`). Para producción, se recomienda configurar orígenes específicos.

## 🧪 Testing

```bash
# Ejecutar tests
mvn test

# Ejecutar tests con coverage
mvn test jacoco:report
```

## 📦 Despliegue

### JAR ejecutable:
```bash
mvn clean package
java -jar target/omega-backend-1.0.0.jar
```

### Docker:
```bash
# Construir imagen
docker build -t omega-backend .

# Ejecutar contenedor
docker run -p 8080:8080 omega-backend
```

## 🔗 Integración con Frontend

Para integrar con el frontend Angular, actualiza las URLs en los servicios:

```typescript
// En los servicios de Angular
private apiUrl = 'http://localhost:8080/api';

// Ejemplo de uso
getCourses(): Observable<Course[]> {
  return this.http.get<Course[]>(`${this.apiUrl}/courses`);
}
```

## 📝 Notas Importantes

1. **Base de datos**: Asegúrate de que MySQL esté ejecutándose antes de iniciar la aplicación.
2. **Puerto**: El servidor se ejecuta en el puerto 8080 por defecto.
3. **CORS**: Configurado para desarrollo. Ajustar para producción.
4. **Logging**: Configurado en nivel DEBUG para desarrollo.

## 🐛 Solución de Problemas

### Error de conexión a la base de datos:
- Verificar que MySQL esté ejecutándose
- Verificar credenciales en `application.properties`
- Verificar que la base de datos `omega_db` exista

### Error de compilación:
- Verificar que Java 17 esté instalado
- Ejecutar `mvn clean compile`

### Error de CORS:
- Verificar configuración en `application.properties`
- Verificar que el frontend esté haciendo peticiones al puerto correcto

## 📞 Soporte

Para soporte técnico, contactar al equipo de desarrollo de NODO EAFIT. 