from __future__ import unicode_literals
from django.shortcuts import render
from django.http import JsonResponse
from django.forms.models import model_to_dict
from models import User 
from django.http import JsonResponse, HttpResponse
from django.forms.models import model_to_dict
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from member.models import User
from place.models import Place

# Create your views here.
def index(request):
    print "REQUEST ISSSSSS:"
    print request
    registration = User.UserManager.valid_registration(request.POST)
    if 'user' in registration:
        user = {
            'first_name': registration['user']['first_name'],
            'user_id': registration['user']['id'],
        }
        return JsonResponse(user)
    else:
        return JsonResponse(registration['messages'])    
