-- Script SQL para crear las tablas de la base de datos Omega
-- Basado en las entidades de Spring Boot

-- Tabla de cursos
CREATE TABLE courses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image_url VARCHAR(500),
    modality ENUM('VIRTUAL', 'PRESENCIAL') NOT NULL,
    certification VARCHAR(255),
    duration TEXT,
    description TEXT,
    price DOUBLE NOT NULL
);

-- Tabla de contenido de cursos
CREATE TABLE course_contents (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(255) NOT NULL
);

-- Tabla de unidades
CREATE TABLE units (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    unit_number INT NOT NULL,
    course_content_id BIGINT,
    FOREIGN KEY (course_content_id) REFERENCES course_contents(id) ON DELETE CASCADE
);

-- Tabla de recursos
CREATE TABLE resources (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    resource_name VARCHAR(500) NOT NULL,
    link VARCHAR(1000),
    embed TEXT,
    unit_id BIGINT,
    FOREIGN KEY (unit_id) REFERENCES units(id) ON DELETE CASCADE
);

-- Índices para mejorar el rendimiento
CREATE INDEX idx_courses_title ON courses(title);
CREATE INDEX idx_courses_modality ON courses(modality);
CREATE INDEX idx_courses_price ON courses(price);
CREATE INDEX idx_course_contents_name ON course_contents(course_name);
CREATE INDEX idx_units_course_content ON units(course_content_id);
CREATE INDEX idx_units_number ON units(unit_number);
CREATE INDEX idx_resources_unit ON resources(unit_id);
CREATE INDEX idx_resources_name ON resources(resource_name);

-- Datos de ejemplo basados en db.json
INSERT INTO courses (title, image_url, modality, certification, duration, description, price) VALUES
('PROCESAMIENTO DE DATOS', 'assets/images/procesamiento-de-datos.jpg', 'VIRTUAL', 'Certificación virtual', '3 Meses / 12 Semanas - 72 horas sincrónicas de mentorías con expertos en la industria / Contenido de apoyo en plataforma, diseñado con metodología Edublocks / Reto real, propuesto por empresa aliada', '¡Fortalece tu potencial con nuestro curso de Procesamiento de Datos! Descubre las habilidades fundamentales que necesitas para conocer el mundo del procesamiento de datos. Los módulos especializados que conforman el curso son: Programación con Python; Estadística básica con Python; Bases de datos relacionales; y Limpieza y transformación de datos en Python. ¡No te pierdas esta oportunidad de adquirir conocimientos esenciales y aplicables en el mercado laboral actual! Con recursos de calidad, te acompañaremos en cada paso del camino. ¡Prepárate para acceder al mundo de posibilidades en el procesamiento de datos!', 2700000.0),
('BACKEND', 'assets/images/backend.png', 'VIRTUAL', 'Certificación virtual', '3 Meses / 12 Semanas - 72 horas sincrónicas de mentorías con expertos en la industria / Contenido de apoyo en plataforma, diseñado con metodología Edublocks / Reto real, propuesto por empresa aliada / 72 horas de inglés para tecnología', 'Aquí podrás crear los servicios y las funciones que procesan los datos del usuario y que retornan una respuesta. Aprenderás cómo se cumple este proceso y qué existe luego de que alguien teclea "Enviar". En el módulo de Backend adquirirás habilidades en programación orientada a objetos con Java, manejo de APIs, utilización del framework Spring Boot, y bases de datos SQL y NoSQL, todo enriquecido con aplicaciones prácticas y trabajo colaborativo que te ayudará a desarrollar soft skills. Recomendamos una dedicación mínima de 26 horas a la semana, para completar: el contenido en plataforma diseñado con metodología Edublocks. 72 horas de mentorías con expertos en la industria. 72 horas de inglés para tecnología, con encuentros sincrónicos y actividades en plataforma. Potencia tus habilidades con Nodo EAFIT, contáctanos para conocer más sobre la ruta de formación en Desarrollo Web.', 2700000.0),
('IA PARA TODOS', 'assets/images/ia.jpg', 'VIRTUAL', 'Certificación virtual', '10 HORAS', '¡Descubre cómo la IA está revolucionando el mundo! Conoce los conceptos clave de la IA, cómo surgió, cómo está impactando las industrias a nivel mundial, las posibilidades que nos brinda, cómo utilizarla y cómo esta tecnología está cambiando el futuro.', 473000.0),
('MACHINE LEARNING', 'assets/images/machine-learning.jpg', 'PRESENCIAL', 'Certificación presencial', '20 HORAS', 'Aprende Machine Learning con aplicaciones prácticas en la actualidad.', 2000000.0),
('DESARROLLO FULL STACK', 'assets/images/fullstack.jpg', 'VIRTUAL', 'Certificación virtual', '6 Meses', 'Aprende desarrollo frontend con Angular y backend con Node.js, Express y bases de datos SQL/NoSQL.', 3500000.0),
('DATA SCIENCE AVANZADO', 'assets/images/data-science.jpg', 'PRESENCIAL', 'Certificación presencial', '5 Meses', 'Curso avanzado de Data Science utilizando Python, Pandas, Scikit-Learn y modelos de Machine Learning.', 4500000.0),
('CIBERSEGURIDAD', 'assets/images/ciberseguridad.jpg', 'VIRTUAL', 'Certificación virtual', '4 Meses', 'Domina la seguridad informática, hacking ético y protección contra ciberataques.', 3200000.0),
('BLOCKCHAIN Y CRIPTOMONEDAS', 'assets/images/blockchain.jpg', 'VIRTUAL', 'Certificación virtual', '3 Meses', 'Conoce cómo funciona Blockchain, smart contracts y el ecosistema de criptomonedas.', 2800000.0);

-- Datos de ejemplo para contenido de cursos (basado en resources_IA_para_todos.json)
INSERT INTO course_contents (course_name) VALUES
('IA PARA TODOS');

-- Obtener el ID del contenido del curso IA PARA TODOS
SET @course_content_id = LAST_INSERT_ID();

-- Insertar unidades para IA PARA TODOS
INSERT INTO units (unit_number, course_content_id) VALUES
(1, @course_content_id),
(2, @course_content_id),
(3, @course_content_id);

-- Insertar recursos para la unidad 1
SET @unit_1_id = (SELECT id FROM units WHERE unit_number = 1 AND course_content_id = @course_content_id);
INSERT INTO resources (resource_name, link, embed, unit_id) VALUES
('¿Qué verás en este curso?', 'https://view.genially.com/672d1563e666d8eefe2ab988', '<div style="width: 100%;"><div style="position: relative; padding-bottom: 56.25%; padding-top: 0; height: 0;"><iframe title="[Recurso introductorio] ¿Qué verás en este curso?" frameborder="0" width="1920" height="1080" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://view.genially.com/672d1563e666d8eefe2ab988" type="text/html" allowscriptaccess="always" allowfullscreen="true" scrolling="yes" allownetworking="all"></iframe> </div> </div>', @unit_1_id),
('¿Qué verás en esta unidad?', 'https://view.genially.com/672d239ee1b1e55f6f36cc15', '<div style="width: 100%;"><div style="position: relative; padding-bottom: 56.25%; padding-top: 0; height: 0;"><iframe title="[Recurso introductorio] ¿Qué verás en esta unidad?" frameborder="0" width="1920" height="1080" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://view.genially.com/672d239ee1b1e55f6f36cc15" type="text/html" allowscriptaccess="always" allowfullscreen="true" scrolling="yes" allownetworking="all"></iframe> </div> </div>', @unit_1_id),
('¿Qué es la IA?', 'https://view.genially.com/672d1ada9e275235cf341926', '<div style="width: 100%;"><div style="position: relative; padding-bottom: 56.25%; padding-top: 0; height: 0;"><iframe title="[Concepto 1] ¿Qué es la IA?" frameborder="0" width="1920" height="1080" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://view.genially.com/672d1ada9e275235cf341926" type="text/html" allowscriptaccess="always" allowfullscreen="true" scrolling="yes" allownetworking="all"></iframe> </div> </div>', @unit_1_id); 