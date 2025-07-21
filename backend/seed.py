# backend/seed.py
from app import create_app
from db import db
from models import Export

def seed():
    app = create_app()
    with app.app_context():
        
        Export.query.delete()

        
        sample = [
            # 2021
            Export(year=2021, sector='RMG',     value=32000, country='Total'),
            Export(year=2021, sector='Agro',    value=2500,  country='Total'),
            Export(year=2021, sector='Leather', value=1200,  country='Total'),
            Export(year=2021, sector='Pharma',  value=800,   country='Total'),
            Export(year=2021, sector='ICT',     value=700,   country='Total'),

            # 2022
            Export(year=2022, sector='RMG',     value=34000, country='Total'),
            Export(year=2022, sector='Agro',    value=2700,  country='Total'),
            Export(year=2022, sector='Leather', value=1400,  country='Total'),
            Export(year=2022, sector='Pharma',  value=1000,  country='Total'),
            Export(year=2022, sector='ICT',     value=850,   country='Total'),

           
            Export(year=2023, sector='RMG',     value=31000, country='Total'),
            Export(year=2023, sector='Agro',    value=2800,  country='Total'),
            Export(year=2023, sector='Leather', value=1600,  country='Total'),
            Export(year=2023, sector='Pharma',  value=1100,  country='Total'),
            Export(year=2023, sector='ICT',     value=1000,  country='Total'),
        ]

        db.session.bulk_save_objects(sample)
        db.session.commit()
        print("Seeded sample export data for 2021, 2022 & 2023.")

if __name__ == '__main__':
    seed()
