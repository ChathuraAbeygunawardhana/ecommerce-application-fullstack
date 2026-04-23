# ecommerce-application-fullstack

backend running command

cd backend
source .venv/bin/activate
uvicorn main:app --reload

------------------
cd frontend
npm run dev

-------------------

database container
TAINER ID   IMAGE      COMMAND                  CREATED       STATUS             PORTS                                         NAMES
f615698f9407   postgres   "docker-entrypoint.s…"   10 days ago   Up About an hour   0.0.0.0:5432->5432/tcp, [::]:5432->5432/tcp   my-postgres