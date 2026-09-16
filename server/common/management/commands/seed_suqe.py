from django.core.management.base import BaseCommand
from django.db import transaction

from categories.models import Category
from conditions.models import Condition
from currencies.models import Currency
from locations.models import Location
from listing_types.models import ListingType


class Command(BaseCommand):
    help = "Seed initial Suqe categories, conditions, currencies, locations, and listing types."

    @transaction.atomic
    def handle(self, *args, **options):

        self.stdout.write(
            self.style.WARNING("Seeding Suqe initial data...")
        )

        # =========================================================
        # 1. CURRENCIES
        # =========================================================

        currencies = [
            {
                "name": "Ethiopian Birr",
                "code": "ETB",
                "symbol": "Br",
            },
            {
                "name": "US Dollar",
                "code": "USD",
                "symbol": "$",
            },
        ]

        for data in currencies:
            currency, created = Currency.objects.get_or_create(
                code=data["code"],
                defaults={
                    "name": data["name"],
                    "symbol": data["symbol"],
                    "is_active": True,
                },
            )

            if created:
                self.stdout.write(
                    self.style.SUCCESS(
                        f"Created currency: {currency}"
                    )
                )
            else:
                self.stdout.write(
                    f"Currency already exists: {currency}"
                )

        # =========================================================
        # 2. CONDITIONS
        # =========================================================

        conditions = [
            "New",
            "Like New",
            "Good",
            "Fair",
            "Needs Repair",
            "Poor",
        ]

        for name in conditions:
            condition, created = Condition.objects.get_or_create(
                name=name,
                defaults={
                    "is_active": True,
                },
            )

            if created:
                self.stdout.write(
                    self.style.SUCCESS(
                        f"Created condition: {condition}"
                    )
                )
            else:
                self.stdout.write(
                    f"Condition already exists: {condition}"
                )

        # =========================================================
        # 3. LISTING TYPES
        # =========================================================

        listing_types = [
            "Sale",
            "Free",
            "Rent",
            "Exchange",
            "Auction",
        ]

        for name in listing_types:
            listing_type, created = ListingType.objects.get_or_create(
                name=name,
                defaults={
                    "is_active": True,
                },
            )

            if created:
                self.stdout.write(
                    self.style.SUCCESS(
                        f"Created listing type: {listing_type}"
                    )
                )
            else:
                self.stdout.write(
                    f"Listing type already exists: {listing_type}"
                )

        # =========================================================
        # 4. CATEGORIES
        # =========================================================

        categories = {
            "Electronics": [
                "Phones",
                "Laptops",
                "Tablets",
                "Cameras",
                "TVs",
                "Audio",
                "Computer Accessories",
            ],

            "Fashion": [
                "Men's Clothing",
                "Women's Clothing",
                "Shoes",
                "Bags",
                "Watches",
                "Accessories",
            ],

            "Home & Kitchen": [
                "Furniture",
                "Kitchen",
                "Home Appliances",
                "Decor",
                "Beds & Mattresses",
            ],

            "Vehicles": [
                "Cars",
                "Motorcycles",
                "Bicycles",
                "Vehicle Parts",
            ],

            "Books & Education": [
                "Textbooks",
                "School Books",
                "University Books",
                "Stationery",
                "Educational Materials",
            ],

            "Sports & Fitness": [
                "Sports Equipment",
                "Fitness Equipment",
                "Football",
                "Other Sports",
            ],

            "Kids": [
                "Kids Clothing",
                "Kids Toys",
                "Baby Products",
                "School Supplies",
            ],

            "Beauty & Personal Care": [
                "Skincare",
                "Hair Care",
                "Beauty Products",
                "Personal Care",
            ],

            "Services": [
                "Home Services",
                "Repair Services",
                "Tutoring",
                "Technology Services",
                "Other Services",
            ],

            "Other": [
                "Other",
            ],
        }

        for parent_name, children in categories.items():

            parent, parent_created = Category.objects.get_or_create(
                name=parent_name,
                defaults={
                    "is_active": True,
                },
            )

            if parent_created:
                self.stdout.write(
                    self.style.SUCCESS(
                        f"Created category: {parent}"
                    )
                )
            else:
                self.stdout.write(
                    f"Category already exists: {parent}"
                )

            for child_name in children:

                child, child_created = Category.objects.get_or_create(
                    name=child_name,
                    defaults={
                        "parent": parent,
                        "is_active": True,
                    },
                )

                if child_created:
                    self.stdout.write(
                        self.style.SUCCESS(
                            f"  Created subcategory: {child}"
                        )
                    )
                else:
                    self.stdout.write(
                        f"  Subcategory already exists: {child}"
                    )

        # =========================================================
        # 5. LOCATIONS
        # =========================================================

        locations = [
            # Addis Ababa
            {
                "country": "Ethiopia",
                "city": "Addis Ababa",
                "area": "Bole",
            },
            {
                "country": "Ethiopia",
                "city": "Addis Ababa",
                "area": "Kality",
            },
            {
                "country": "Ethiopia",
                "city": "Addis Ababa",
                "area": "Lideta",
            },
            {
                "country": "Ethiopia",
                "city": "Addis Ababa",
                "area": "Arada",
            },
            {
                "country": "Ethiopia",
                "city": "Addis Ababa",
                "area": "Yeka",
            },
            {
                "country": "Ethiopia",
                "city": "Addis Ababa",
                "area": "Kirkos",
            },
            {
                "country": "Ethiopia",
                "city": "Addis Ababa",
                "area": "Nifas Silk-Lafto",
            },
            {
                "country": "Ethiopia",
                "city": "Addis Ababa",
                "area": "Kolfe Keranio",
            },
            {
                "country": "Ethiopia",
                "city": "Addis Ababa",
                "area": "Gulele",
            },

            # Ambo
            {
                "country": "Ethiopia",
                "city": "Ambo",
                "area": "Hawaro",
            },
            {
                "country": "Ethiopia",
                "city": "Ambo",
                "area": "02",
            },
            {
                "country": "Ethiopia",
                "city": "Ambo",
                "area": "01",
            },
            {
                "country": "Ethiopia",
                "city": "Ambo",
                "area": "03",
            },
            {
                "country": "Ethiopia",
                "city": "Ambo",
                "area": "04",
            },
        ]

        for data in locations:

            location, created = Location.objects.get_or_create(
                country=data["country"],
                city=data["city"],
                area=data["area"],
                defaults={
                    "is_active": True,
                },
            )

            if created:
                self.stdout.write(
                    self.style.SUCCESS(
                        f"Created location: {location}"
                    )
                )
            else:
                self.stdout.write(
                    f"Location already exists: {location}"
                )

        # =========================================================
        # DONE
        # =========================================================

        self.stdout.write("")
        self.stdout.write(
            self.style.SUCCESS(
                "=========================================="
            )
        )
        self.stdout.write(
            self.style.SUCCESS(
                "Suqe seed completed successfully!"
            )
        )
        self.stdout.write(
            self.style.SUCCESS(
                "=========================================="
            )
        )