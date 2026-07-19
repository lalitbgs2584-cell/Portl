-- ==========================================================
-- Portl Database
-- Migration: 002_core_enums
-- Description: Core enums shared across the application
-- ==========================================================

CREATE TYPE public.user_role AS ENUM (
    'admin',
    'resident',
    'guard'
);

CREATE TYPE public.gender AS ENUM (
    'male',
    'female',
    'other'
);

CREATE TYPE public.profile_approval_status AS ENUM (
    'pending',
    'approved',
    'rejected'
);

CREATE TYPE public.flat_status AS ENUM (
    'vacant',
    'occupied',
    'under_maintenance',
    'inactive'
);

CREATE TYPE public.flat_configuration AS ENUM (
    '1RK',
    '1BHK',
    '1.5BHK',
    '2BHK',
    '2.5BHK',
    '3BHK',
    '3.5BHK',
    '4BHK',
    '4.5BHK',
    '5BHK',
    'Villa',
    'Penthouse',
    'Studio',
    'Duplex',
    'Commercial',
    'Office',
    'Shop'
);

CREATE TYPE public.society_status AS ENUM (
    'active',
    'inactive',
    'pending'
);

CREATE TYPE public.flat_member_type AS ENUM (
    'owner',
    'tenant',
    'family'
);

CREATE TYPE public.flat_member_status AS ENUM (
    'pending',
    'approved',
    'rejected',
    'inactive'
);

CREATE TYPE public.family_relationship AS ENUM (
    'spouse',
    'father',
    'mother',
    'son',
    'daughter',
    'brother',
    'sister',
    'grandfather',
    'grandmother',
    'other'
);

CREATE TYPE public.staff_type AS ENUM (
    'housekeeping',
    'electrician',
    'plumber',
    'gardener',
    'technician',
    'office_staff',
    'maintenance',
    'other'
);

CREATE TYPE public.amenity_status AS ENUM (
    'active',
    'inactive',
    'maintenance'
);

CREATE TYPE public.booking_status AS ENUM (
    'pending',
    'approved',
    'rejected',
    'cancelled',
    'completed'
);

CREATE TYPE public.complaint_status AS ENUM (
    'open',
    'in_progress',
    'resolved',
    'closed'
);

CREATE TYPE public.poll_status AS ENUM (
    'draft',
    'active',
    'closed'
);

CREATE TYPE public.notification_type AS ENUM(
    'visitor_request',
    'complaint_update',
    'payment_due',
    'notice',
    'event',
    'poll',
    'system'
);

CREATE TYPE public.notification_reference_type AS ENUM(
    'visitor',
    'complaint',
    'payment',
    'notice',
    'event',
    'poll'
);

CREATE TYPE public.shift_type AS ENUM(
    'morning',
    'evening',
    'night'
);

CREATE TYPE public.guard_status AS ENUM(
    'active',
    'inactive',
    'suspended'
);

CREATE TYPE public.staff_leave_status AS ENUM(
    'pending',
    'approved',
    'rejected',
    'cancelled'
);


CREATE TYPE public.staff_log_status AS ENUM(
    'inside',
    'exited'
);

CREATE TYPE public.lost_found_type AS ENUM(
    'lost',
    'found'
);

CREATE TYPE public.lost_found_status AS ENUM(
    'open',
    'closed'
);

CREATE TYPE public.guest_pass_status AS ENUM(
    'active',
    'expired',
    'cancelled'
);

CREATE TYPE public.approval_method AS ENUM(
    'resident',
    'qr',
    'guard',
    'admin'
);

CREATE TYPE public.visit_type AS ENUM(
    'guest',
    'delivery',
    'service',
    'staff',
    'emergency'
);

CREATE TYPE public.marketplace_listing_status AS ENUM(
    'available',
    'reserved',
    'sold',
    'removed'
);

CREATE TYPE public.marketplace_listing_category AS ENUM(
    'electronics',
    'furniture',
    'books',
    'vehicles',
    'appliances',
    'other'
);

CREATE TYPE public.marketplace_listing_condition AS ENUM(
    'new',
    'like_new',
    'good',
    'used'
);

CREATE TYPE public.consultation_request_status AS ENUM(
    'pending',
    'accepted',
    'rejected',
    'completed',
    'cancelled'
);

CREATE TYPE public.delivery_log_status AS ENUM(
    'pending',
    'entered',
    'delivered',
    'exited',
    'cancelled'
);

CREATE TYPE public.invoices_status AS ENUM(
    'pending',
    'paid',
    'overdue',
    'cancelled'
);

CREATE TYPE public.charge_type AS ENUM(
    'maintenance',
    'amenity',
    'parking',
    'fine',
    'utility',
    'other'
);

CREATE TYPE public.reference_type AS ENUM(
    'amenity_booking',
    'custom'
);
