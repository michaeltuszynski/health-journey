# Health Journey Tracker - System Requirements

## Core Components

### 1. Data Integration
- **Apple Health Integration**
  - Daily sync of:
    - Move calories
    - Exercise minutes
    - Stand hours (matching Apple Watch rings)
    - Water intake (converted from ml to cups)
  - Data imported from JSON files in iCloud Drive
  - Support for historical data import via date parameter
- **Health Data File Format**
  - Location: `/Users/mpt/Library/Mobile Documents/com~apple~CloudDocs/health-data-sync`
  - Filename pattern: `health-data-YYYY-MM-DD.json`
  - JSON structure:
    ```json
    {
      "move_calories": float,      // Active calories burned
      "exercise_mins": int,        // Minutes of exercise
      "stand_hours": int,          // Hours stood (matching rings)
      "water_ml": float           // Water intake in milliliters
    }
    ```
  - Units:
    - Move calories: Active calories (float)
    - Exercise minutes: Whole numbers
    - Stand hours: Whole numbers (1-24)
    - Water: Milliliters (converted to cups for display)

### 2. Tracking Sheets

#### A. Daily Tracking
- **Date-based entries** (Dec 27, 2024 - Dec 31, 2025)
- **Metrics tracked:**
  - Weight (pulled from Measurements)
  - BMR (calculated using Mifflin-St Jeor formula)
  - Daily Calorie Target
  - Meals (Breakfast, Lunch, Dinner, Snacks)
    - Each meal has name, servings, and calculated calories
  - Total Calories Consumed
  - Caloric Deficit
  - Move Calories (from Apple Watch)
  - Exercise Minutes (from Apple Watch)
  - Standing Hours (from Apple Watch)
  - Water Intake (cups)
  - Notes/Symptoms
  - Days into Journey

#### B. Weekly Summary
- **Automatic calculations per week:**
  - Average Weight
  - Weekly Weight Change
  - Total Calories Consumed
  - Total Caloric Deficit
  - Total Move Calories
  - Average Exercise Minutes
  - Progress (% towards goal)
  - Notes

#### C. Measurements Tracker
- **Metrics:**
  - Date
  - Weight (lbs)
  - Body Fat %
  - Chest (in)
  - Waist (in)
  - Hips (in)
  - Biceps (in)
  - Thighs (in)
  - Notes
- **Features:**
  - Conditional formatting for weight changes
  - Color gradient from green (230 lbs) to yellow (280 lbs) to red (330 lbs)

#### D. Meals Library
- **Meal attributes:**
  - Name
  - Category (Breakfast/Lunch/Dinner/Snack)
  - Calories per serving
  - Protein (g)
  - Carbs (g)
  - Fat (g)
  - Default servings
  - Notes
  - Last Used date
- **Features:**
  - Dropdown selection in Daily Tracking
  - Automatic calorie calculation based on servings
  - Command-line interface for adding/listing/searching meals

#### E. Goals & Safety
- **Journey Parameters:**
  - Start/End Dates
  - Birth Date (for BMR calculation)
  - Height
  - Starting Weight
  - Target Weight
  - Required Loss
- **Caloric Guidelines:**
  - BMR calculation (Mifflin-St Jeor)
  - Daily Calorie Target
- **Measurement Schedule:**
  - Weight (Daily/Weekly)
  - Body Fat % (Monthly)
  - Body Measurements (Monthly)
  - Progress Photos (Monthly)
- **Daily Targets:**
  - Move Calories: 550
  - Exercise Minutes: 40
  - Standing Hours: 8
  - Water Intake: 8-10 cups
- **Safety Notes/Reminders**

### 3. Command Line Tools
- **Health Data Sync**
  - Automatic import from JSON files
  - Date-specific imports
  - Column mapping for spreadsheet updates
- **Meal Management**
  - Add new meals
  - List all meals
  - Search meals
  - Filter by category

### 4. Calculations & Formulas
- **BMR (Mifflin-St Jeor):**
  - `(10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5`
- **Daily Calorie Target:**
  - `BMR × 1.2 - 750` (deficit)
- **Progress Tracking:**
  - Weight loss progress percentage
  - Days into journey counter
- **Meal Calories:**
  - Per-serving calculations
  - Total daily consumption

### 5. Data Validation & Formatting
- **Date Formatting:**
  - Consistent YYYY-MM-DD format
- **Measurement Units:**
  - Weight in pounds
  - Height in feet
  - Measurements in inches
  - Water in cups
- **Dropdown Menus:**
  - Meal selection
  - Category selection