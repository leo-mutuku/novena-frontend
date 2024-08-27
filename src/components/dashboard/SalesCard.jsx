import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

const salesData = [
  { week: "Week 1", totalSales: 1200, percentageChange: 5 },
  { week: "Week 2", totalSales: 1500, percentageChange: 25 },
  { week: "Week 3", totalSales: 1100, percentageChange: -10 },
  { week: "Week 4", totalSales: 1300, percentageChange: 18 },
];

const SalesCard = () => {
  const getColor = (change) => {
    if (change > 0) return "green";
    if (change < 0) return "red";
    return "gray";
  };

  const getIcon = (change) => {
    if (change > 0) return <ArrowUpward fontSize="small" />;
    if (change < 0) return <ArrowDownward fontSize="small" />;
    return null;
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Monthly Sales Analysis
        </Typography>
        <Grid container spacing={2}>
          {salesData.map(({ week, totalSales, percentageChange }) => (
            <Grid item xs={12} key={week}>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="body1">{week}</Typography>
                <Typography variant="body1">${totalSales}</Typography>
                <Typography
                  variant="body1"
                  style={{ color: getColor(percentageChange) }}
                >
                  {getIcon(percentageChange)}
                  {`${percentageChange}%`}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SalesCard;
