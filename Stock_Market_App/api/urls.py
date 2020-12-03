from django.urls import path
from .views import TickerView, FundamentView

urlpatterns = [
    path('', TickerView.as_view()),
    path('fundament/<str:pk>', FundamentView.as_view())
]