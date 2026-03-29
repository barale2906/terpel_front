.PHONY: up down start stop restart ps logs app init show-urls npm test build

up:
	@echo "=> Levantando contenedores (build incluido)..."
	docker compose up -d --build
	@$(MAKE) show-urls

init:
	@echo "=> Inicializando proyecto por primera vez..."
	@echo "=> Instalando dependencias..."
	docker compose run --rm app npm install
	@$(MAKE) up
	@echo "=> Inicializacion completada."
	@$(MAKE) show-urls

down:
	@echo "=> Deteniendo y eliminando contenedores/red..."
	docker compose down

stop:
	@echo "=> Deteniendo contenedores (sin borrar datos)..."
	docker compose stop

start:
	@echo "=> Iniciando contenedores existentes..."
	docker compose start
	@$(MAKE) show-urls

restart:
	@echo "=> Reiniciando contenedores..."
	docker compose restart
	@$(MAKE) show-urls

ps:
	@echo "=> Estado de servicios:"
	docker compose ps

logs:
	docker compose logs -f $(filter-out $@,$(MAKECMDGOALS))

app:
	docker compose exec app bash

npm:
	docker compose exec app npm $(filter-out $@,$(MAKECMDGOALS))

test:
	docker compose exec app npm run test

build:
	docker compose exec app npm run build

show-urls:
	@echo ""
	@echo "=> Accesos:"
	@echo "   App (Vite): http://localhost:5173"
	@echo ""

%:
	@:
