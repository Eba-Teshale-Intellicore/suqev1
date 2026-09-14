from django.db import migrations


def create_missing_profiles(apps, schema_editor):
    User = apps.get_model("accounts", "User")
    Profile = apps.get_model("profiles", "Profile")

    for user in User.objects.all():
        Profile.objects.get_or_create(
            user=user,
            defaults={
                "display_name": user.username or "",
            },
        )


def reverse_create_missing_profiles(apps, schema_editor):
    # We intentionally do not delete profiles here.
    pass


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0001_initial"),
        ("profiles", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(
            create_missing_profiles,
            reverse_create_missing_profiles,
        ),
    ]
