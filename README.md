Full Stack E-Commerce platform with admin panel and online store within a single project. Many technologies was used for this project including Next js 14, React, TypeScript, Prisma, Firebase, and Tailwind CSS for user experience, and administrative experience.

## Features

## Admin Panel

#### Dashboard

- **Sales Overview Graph:**
  - Monitor sales growth and trends through interactive graphs.

#### Product Management

- **Add, Edit, and Delete Products:**
  - Efficiently add, update, and remove products from the admin panel.

#### Categories, Sizes, and Billboards

- **Category Management:**
  - Add, edit, or delete product categories.
- **Size Management:**
  - Add, edit, or delete available product sizes.
- **Billboard Management:**
  - Create, customize, or delete billboards for featured products.

#### User Management

- **Add New Users:**
  - Enhance user experience by adding new users.
- **Assign Administrator Privileges:**
  - Assign administrator privileges to users from the Admin Panel.
 
## Store

### Home Page

- **Top Categories Display:**
  - Explore top categories right on the home page for easy navigation.
- **Featured Products Showcase:**
  - Discover highlighted and featured products for an engaging shopping experience.
- **Search Functionality:**
  - Quickly find products using the search bar.

### Shop Page

- **Product Listing:**
  - View all available products in one place.
- **Category Filters:**
  - Narrow down your search using category filters.
- **Price Range Filters:**
  - Set a specific price range for more targeted results.
- **Sorting Options:**
  - Sort products by price (ascending/descending) and view the latest arrivals.
  
### Product Page

- **Product Details:**
  - View detailed information, including images and available sizes.
- **Add to Cart:**
  - Easily add products to your shopping cart for a seamless checkout process.

### Cart Page

- **Review and Edit Cart:**
  - View and modify items in your shopping cart.
- **Proceed to Checkout:**
  - Move seamlessly from the cart to the checkout process.
 

## Technologies Used
- Next.js
- React
- TypeScript
- Prisma
- Clerk
- Firebase
- Tailwind CSS
- Material-UI


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Requirements
- Node.js (version 14.6.0 or newer) and npm (bundled with Node.js)
- A PostgreSQL database server installed and running
- Firebase console account

## Getting Started
After you ``clone`` the repository from [Github](https://github.com/A7madBashir/next-js-ecommerce-app-have-break.git)

Install the required packages:

```bash
npm install
```

Then create ``.env`` file which must includes the variables as ``.env.example.`` file, Don't miss any key

### Prisma configuration
Using postgres ``psql`` command prompt create a new database ``CREATE DATABASE store_db`` to use it.
Then go to project directory then just apply the migration schema ``npx prisma db push``

### Clerk configuration and firebase integrating
Go to [Clerk](https://clerk.com) create a new account then navigate to the dashboard panel make sure to integrate clerk account with firebase and configure required webhooks with additional secret keys
Don't forget to add metadata to admin user after you created manually just add ``{ "isAdmin": true }`` object to ``unsafe`` metadata.

## You are ready now!
start the application by  running ``npm run dev`` 

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Learn More
To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
