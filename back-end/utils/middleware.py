import requests
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse



def get_user_data(token):
    url = f"{settings.BASE_URL}"
    headers = {'Authorization': f'Bearer {token}'}
    proxies = {"http": None, "https": None}
    try:
        response = requests.get(url, headers=headers, proxies=proxies)
        response.raise_for_status()
        return response.json(), None
    except requests.RequestException as e:
        return None, JsonResponse({"error": f"Error fetching user data: {str(e)}"}, status=500)


class UserAuthMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        excluded_paths = [
            '/admin/', '/static/', '/media/', '/swagger/',
        ]
        if not any(request.path.startswith(path) for path in excluded_paths):
            authorization_header = request.headers.get('Authorization', None)
            if not authorization_header:
                return JsonResponse({'error': 'Authorization header is missing'}, status=400)
            user_data, error = get_user_data(authorization_header)
            if error:
                return error
            if not user_data or not user_data.get('id'):
                return JsonResponse({"error": "Invalid or missing user data"}, status=401)

            request.user_data = user_data

        response = self.get_response(request)
        return response
