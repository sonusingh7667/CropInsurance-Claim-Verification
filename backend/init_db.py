from backend.database import engine, Base
from backend import models

Base.metadata.create_all(bind=engine)

print("CropSure database created successfully!")

for table in Base.metadata.sorted_tables:
    print("Created table:", table.name)
