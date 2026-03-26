# Aerospike-DB-CRUD
Prueba de operaciones CRUD en base de datos no realacional clave-valor: Aerospike
Proyecto en nodejs+express, dockerizado.

## CRUD API - Aerospike (Base de Datos Clave-Valor)

Este proyecto implementa una API RESTful para demostrar las operaciones CRUD básicas utilizando **Aerospike**, una base de datos NoSQL de tipo Clave-Valor pura, de grado empresarial. Todo el entorno está dockerizado para facilitar su ejecución.

---

## Cómo ejecutar la demostracion

### Requisitos previos
* Docker y Docker Compose instalados.

### Instalación y despliegue
1. Clonar el repositorio.
2. Abrir una terminal en la raíz del proyecto.
3. Ejecutar el siguiente comando para levantar la base de datos y la API:
   ```bash
   docker-compose up -d --build

