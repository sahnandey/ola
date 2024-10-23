import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Load the dataset from your directory
df = pd.read_csv('datasets/olas.csv')

# Inspect column names
print(df.columns)

# Handle missing values: fill with zeros or drop them as needed
df.fillna(0, inplace=True)

# 1. Histogram: Distribution of distances to chargers
plt.hist(df['distance_meters'].dropna(), bins=20, edgecolor='black')
plt.title('Distribution of Distances to Chargers')
plt.xlabel('Distance (meters)')
plt.ylabel('Frequency')
plt.show()

# 2. Scatter Plot: Distance to charger vs. operational start time
# Convert start_time to datetime, and handle NaNs or invalid formats
df['start_time'] = pd.to_datetime(df['addendum.operationalDaysHours.All_DAY.start_time'], errors='coerce')
df = df.dropna(subset=['start_time'])  # Drop rows where start_time is NaN
plt.scatter(df['distance_meters'], df['start_time'].dt.hour, alpha=0.5)
plt.title('Distance to Charger vs. Operational Start Time (Hour)')
plt.xlabel('Distance (meters)')
plt.ylabel('Start Time (Hour of Day)')
plt.show()

# 3. Pie Chart: Types of chargers available
charger_type_counts = df['types'].fillna('Unknown').value_counts()
plt.pie(charger_type_counts, labels=charger_type_counts.index, autopct='%1.1f%%', startangle=90)
plt.title('Types of Chargers Available')
plt.show()

# 4. Bar Chart: Number of slots at each charger
slot_counts = df['addendum.numberOfSlots'].fillna(0).value_counts()
slot_counts.plot(kind='bar', color='skyblue')
plt.title('Number of Slots at Chargers')
plt.xlabel('Slots')
plt.ylabel('Frequency')
plt.show()

# 5. Line Graph: Operational time across different chargers
df['end_time'] = pd.to_datetime(df['addendum.operationalDaysHours.All_DAY.end_time'], errors='coerce')

df[['start_time', 'end_time']].dropna().plot(kind='line')
plt.title('Operational Times of Chargers')
plt.xlabel('Charger Index')
plt.ylabel('Time')
plt.show()

# 6. Stacked Bar Chart: Charger types per city
pivot_table = df.pivot_table(index='addendum.city', columns='types', aggfunc='size', fill_value=0)
pivot_table.plot(kind='bar', stacked=True)
plt.title('Charger Types per City')
plt.xlabel('City')
plt.ylabel('Number of Chargers')
plt.show()

# 7. Box Plot: Distribution of distances to chargers
sns.boxplot(x=df['distance_meters'].dropna())
plt.title('Distribution of Distances to Chargers')
plt.xlabel('Distance (meters)')
plt.show()

# 8. Heatmap: Frequency of charger operations by time of day and city
df['start_hour'] = df['start_time'].dt.hour
heatmap_data = df.groupby(['addendum.city', 'start_hour']).size().unstack().fillna(0)
sns.heatmap(heatmap_data, cmap="Blues", linewidths=.5)
plt.title('Operation Time Frequency by City and Hour')
plt.xlabel('Hour of Day')
plt.ylabel('City')
plt.show()

# 9. Bubble Chart: Distance to charger vs. number of slots
plt.scatter(df['distance_meters'].dropna(), df['addendum.numberOfSlots'].fillna(0),
            s=df['addendum.numberOfSlots'].fillna(0)*10, alpha=0.5)
plt.title('Distance to Charger vs. Number of Slots')
plt.xlabel('Distance (meters)')
plt.ylabel('Number of Slots')
plt.show()

# 10. Donut Chart: Share of operational chargers by city
city_counts = df['addendum.city'].fillna('Unknown').value_counts()
plt.pie(city_counts, labels=city_counts.index, autopct='%1.1f%%', startangle=90)
centre_circle = plt.Circle((0,0),0.70,fc='white')
fig = plt.gcf()
fig.gca().add_artist(centre_circle)
plt.title('Operational Chargers by City')
plt.show()
