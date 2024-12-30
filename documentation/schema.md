# Health Journey Tracker - Database Schema

## Core Tables

### users
Stores user authentication and profile information.
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    google_id VARCHAR(255) UNIQUE NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
```

### journey_parameters
Stores user-specific journey goals and parameters.
```sql
CREATE TABLE journey_parameters (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    birth_date DATE NOT NULL,
    height_inches DECIMAL(4,1) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    start_weight DECIMAL(5,2) NOT NULL,
    target_weight DECIMAL(5,2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id)  -- One journey per user
);
```

### meals
Library of user-defined meals and their nutritional information.
```sql
CREATE TABLE meals (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) CHECK (category IN ('Breakfast', 'Lunch', 'Dinner', 'Snack')),
    calories_per_serving INTEGER NOT NULL,
    protein_grams DECIMAL(5,2),
    carbs_grams DECIMAL(5,2),
    fat_grams DECIMAL(5,2),
    default_servings DECIMAL(3,1) DEFAULT 1.0,
    notes TEXT,
    last_used DATE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
```

### daily_logs
Daily health metrics and activity tracking.
```sql
CREATE TABLE daily_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    date DATE NOT NULL,
    weight DECIMAL(5,2),
    bmr INTEGER,
    daily_calorie_target INTEGER,
    total_calories_consumed INTEGER,
    move_calories INTEGER,
    exercise_minutes INTEGER,
    stand_hours INTEGER,
    water_cups DECIMAL(3,1),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, date)
);
```

### daily_meals
Links meals to daily logs with serving information.
```sql
CREATE TABLE daily_meals (
    id SERIAL PRIMARY KEY,
    daily_log_id INTEGER REFERENCES daily_logs(id),
    meal_id INTEGER REFERENCES meals(id),
    servings DECIMAL(3,1) NOT NULL,
    category VARCHAR(50) CHECK (category IN ('Breakfast', 'Lunch', 'Dinner', 'Snack')),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
```

### measurements
Monthly body measurements tracking.
```sql
CREATE TABLE measurements (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    date DATE NOT NULL,
    weight DECIMAL(5,2) NOT NULL,
    body_fat_percentage DECIMAL(4,1),
    chest_inches DECIMAL(4,1),
    waist_inches DECIMAL(4,1),
    hips_inches DECIMAL(4,1),
    biceps_inches DECIMAL(4,1),
    thighs_inches DECIMAL(4,1),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, date)
);
```

## Indexes

```sql
CREATE INDEX idx_meals_user_id ON meals(user_id);
CREATE INDEX idx_daily_logs_user_date ON daily_logs(user_id, date);
CREATE INDEX idx_measurements_user_date ON measurements(user_id, date);
CREATE INDEX idx_daily_meals_daily_log_id ON daily_meals(daily_log_id);
```

## Data Relationships

- Each user has one journey_parameters record
- Users can have multiple meals in their library
- Daily logs are linked to users with a unique constraint on date
- Daily meals connect daily logs to the meals library
- Measurements are linked to users with monthly tracking