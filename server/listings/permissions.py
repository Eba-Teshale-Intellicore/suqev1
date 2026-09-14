from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsListingOwnerOrStaffOrReadOnly(BasePermission):
    """
    Anyone can read listings.

    Authenticated users can create listings.

    Only the listing owner or staff can
    update/delete their listing.
    """

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return (
            request.user
            and request.user.is_authenticated
        )

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        if request.user.is_staff:
            return True
        return obj.seller.user_id == request.user.id


class IsListingOwnerOrStaff(BasePermission):

    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
        )

    def has_object_permission(self, request, view, obj):
        return (
            request.user.is_staff
            or obj.seller.user_id == request.user.id
        )