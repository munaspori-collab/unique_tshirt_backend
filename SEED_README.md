# Seeding the Database

## Local Development

To seed your local database with sample products:

```bash
npm run seed
```

This will:
1. Connect to your MongoDB database
2. Clear all existing products
3. Insert 7 sample products (3 limited edition, 4 seasonal)

## Production (Render)

To seed the production database on Render:

1. Go to Render Dashboard: https://dashboard.render.com/
2. Select your `unique-tshirt-backend` service
3. Go to **Shell** tab
4. Run:
   ```bash
   npm run build
   npm run seed
   ```

Or use Render's one-off job feature.

## Sample Products Created

### Limited Edition (3 products):
- Exclusive Vintage Print (₹1,499) - In Stock
- Artist Collaboration Series (₹1,799) - In Stock
- Premium Heritage Collection (₹1,999) - Out of Stock

### Seasonal (4 products):
- Autumn Leaves Collection (₹1,299) - In Stock
- Winter Warmth Series (₹1,399) - In Stock
- Spring Blossom Edition (₹1,199) - In Stock
- Summer Vibes Collection (₹1,099) - In Stock

## API Endpoints

After seeding, you can test:

```bash
# Get all products
curl https://unique-tshirt-backend.onrender.com/api/products

# Get limited edition only
curl https://unique-tshirt-backend.onrender.com/api/products?category=limited

# Get seasonal only
curl https://unique-tshirt-backend.onrender.com/api/products?category=seasonal

# Get specific product by slug
curl https://unique-tshirt-backend.onrender.com/api/products/exclusive-vintage-print
```
