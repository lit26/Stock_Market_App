from django.urls import path
from .views import TickerView, MultiView

urlpatterns = [
    path('', TickerView.as_view()),
    path('multi/', MultiView.as_view())
]