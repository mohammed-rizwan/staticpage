#!/bin/bash

# Array of HTML files to process
files=(
    "10inch3Com_plates.html"
    "10inch_plates.html"
    "11inch4com_plates.html"
    "12inch4com_plates.html"
    "180ml_bowl.html"
    "230ml_bowl.html"
    "360ml_bowl.html"
    "4com_rect_plates.html"
    "5com_LT.html"
    "5com_LTWL.html"
    "5com_plate_WL.html"
    "6X6_WL.html"
    "6com_LT.html"
    "6inch_plates.html"
    "6inch_square_plates.html"
    "7inch_plates.html"
    "9X6_WL.html"
    "9X9_3com_WL.html"
    "9inch3com_plates.html"
    "9inch3com_square_plates.html"
    "9inch_plates.html"
    "9inch_square_plates.html"
    "9x9_WL.html"
    "Big_FC_WL.html"
    "Home.html"
    "SB_Bowls.html"
    "SB_container.html"
    "SB_plates.html"
    "about.html"
    "blog.html"
    "contact.html"
    "index.html"
    "inquiry.html"
    "privacy_policy.html"
    "product.html"
    "round_bowl.html"
    "small_FC_WL.html"
    "square_bowl.html"
)

# Update each file
for file in "${files[@]}"; do
    echo "Processing $file..."
    
    # Find and comment out newsletter divs
    sed -i '' '/<div class="ft_footer_right_newslette"/,/<\/div>/ s/^/<\!-- /' "$file"
    sed -i '' '/<div class="ft_footer_right_newslette"/,/<\/div>/ s/$/ -->/' "$file"

done

echo "All newsletter divs have been commented out!"
