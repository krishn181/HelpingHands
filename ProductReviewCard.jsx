

import React from 'react';
import { Avatar, Box, Grid ,Rating} from '@mui/material';

const ProductReviewCard = () => {
    return (
        <div>
            <Grid container spacing={2} gap={3}>
                <Grid item xs={1}>
                    <Box>
                        <Avatar
                            className="text-white"
                            sx={{ width: 56, height: 56, bgcolor: "#9155fd" }}
                        >
                            {/* You can add initials or an image here */}
                            R
                        </Avatar>
                    </Box>
                </Grid>

                <Grid item xs={9}>
                    <div className="space-y-2">
                        <div>
                            <p className='font-semibold text-lg'>Ram</p>
                            <p className='opacity-70'>April 5 2025</p>

                        </div>
                    </div>

                    <Rating value={4.5} name="half-rating" readOnly precision={.5}/>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, veritatis.</p>
                </Grid>
                {/* Add more content for the review, such as the author's name, rating, comment, etc. */}
            </Grid>
        </div>
    );
}

export default ProductReviewCard;
