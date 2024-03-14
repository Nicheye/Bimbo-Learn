from rest_framework.pagination import PageNumberPagination
class Main_Page_Pagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 10