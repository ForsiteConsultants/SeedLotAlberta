import arcpy

# Input parameters (adjust these according to your environment)
feature_layer = r"https://maps.forsite.ca/server/rest/services/Hosted/SeedzonePointTest/FeatureServer/0"  # Update with your feature layer path
seedzone_field = "seedzone"                    # Update if your field name differs
new_field = "seedzone_unformatted"                # Update if you want a different field name

# Check and remove existing new field if present
existing_fields = [f.name for f in arcpy.ListFields(feature_layer)]
if new_field in existing_fields:
    print(f"Removing existing field: {new_field}")
    arcpy.DeleteField_management(feature_layer, new_field)

# Add new text field with sufficient length
print("Adding new field...")
arcpy.AddField_management(feature_layer, new_field, "TEXT", field_length=10)

# Update rows with formatted values
print("Processing features...")
with arcpy.da.UpdateCursor(feature_layer, [seedzone_field, new_field]) as cursor:
    for row in cursor:
        original_value = row[0]
        
        if original_value:  # Only process non-null values
            # Remove spaces and dots, then combine
            formatted_value = original_value.replace(" ", "").replace(".", "")
            row[1] = formatted_value
        else:
            row[1] = None  # Handle null values if needed
            
        cursor.updateRow(row)

print("Processing complete!")