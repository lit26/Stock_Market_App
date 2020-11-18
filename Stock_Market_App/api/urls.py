from django.urls import path
from .views import TickerView

urlpatterns = [
    path('', TickerView.as_view()),
]