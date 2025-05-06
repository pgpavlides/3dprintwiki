# 3D Print Wiki

Where Knowledge Takes Shape - A comprehensive resource for 3D printing enthusiasts.

## Admin Section Setup

The website includes a secure admin section that requires proper configuration before use. Follow these steps to set up admin access:

### 1. Create Environment Variables

Create a `.env` file in the project root with the following content:

```
VITE_ADMIN_USERNAME=your_admin_username
VITE_ADMIN_PASSWORD=your_secure_password
VITE_PARTNER_USERNAME=your_partner_username
VITE_PARTNER_PASSWORD=your_partner_secure_password
```

Replace the placeholder values with your actual secure credentials.

### 2. Security Notes

- The `.env` file is excluded from Git in the `.gitignore` file to ensure your credentials remain private
- Always use strong, unique passwords for admin access
- In a production environment, consider implementing more robust authentication methods

### 3. Accessing the Admin Area

Once configured, you can access the admin area by:
1. Clicking the small "Admin" link in the top-right corner of the homepage
2. Navigating directly to `/admin/login`
3. Entering your credentials set in the `.env` file

## Development

Instructions for setting up the development environment and contributing to the project.

[Additional development instructions go here]
