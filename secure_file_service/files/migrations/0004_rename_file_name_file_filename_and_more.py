# Generated by Django 5.1.4 on 2025-01-02 18:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('files', '0003_alter_sharablelink_permission'),
    ]

    operations = [
        migrations.RenameField(
            model_name='file',
            old_name='file_name',
            new_name='fileName',
        ),
        migrations.RenameField(
            model_name='sharablelink',
            old_name='parent_file',
            new_name='parentFile',
        ),
    ]
