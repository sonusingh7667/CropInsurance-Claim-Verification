def calculate_damage(ndvi_before, ndvi_after):

    if not -1 <= ndvi_before <= 1 or not -1 <= ndvi_after <= 1:
        raise ValueError("NDVI values must be between -1 and 1")

    if ndvi_before <= 0:
        raise ValueError("NDVI before disaster must be greater than zero")

    damage_percentage = (
        (ndvi_before - ndvi_after) / ndvi_before
    ) * 100

    damage_percentage = max(0, min(100, damage_percentage))

    if damage_percentage < 20:
        damage_class = "Low"
    elif damage_percentage < 50:
        damage_class = "Moderate"
    else:
        damage_class = "High"

    return {
        "damage_percentage": round(damage_percentage, 2),
        "damage_class": damage_class
    }