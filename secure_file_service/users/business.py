from users.authentication import UserActivationTokenGenerator
from users.models import User
from django.core.mail import send_mail
from secure_file_service.settings import DEFAUT_SENDER, ORIGIN
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver



def send_user_activation_email(user: User):
    """
    Sends an email to the user with the activation token
    """
    token = UserActivationTokenGenerator().generate_token(user)
    send_mail(
        'Activate your account',
        f'Click here to activate your account: {ORIGIN}users/activate/{token}',
        DEFAUT_SENDER,
        [user.email],
        fail_silently=True,
    )


@receiver(post_save, sender=get_user_model())
def user_post_save_handler(sender, instance, created, **kwargs):
    """
    A signal to send an activation email to the user
    """
    if created:
        send_user_activation_email(instance)