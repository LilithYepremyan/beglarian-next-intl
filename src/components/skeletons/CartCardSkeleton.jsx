import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import MuiListItem from "@mui/material/ListItem";
import Skeleton from "@mui/material/Skeleton";
import { styled } from "@mui/material/styles";
import React from "react";

const ListItem = styled((props) => <MuiListItem {...props} />)(({ theme }) => ({
  padding: "16px 0 0 0",
  alignItems: "center",
  justifyContent: "space-between",
}));

const ListItemTextLeft = styled(() => (
  <Skeleton animation="wave" sx={{ width: "30%" }} />
))(({ theme }) => ({
  flexGrow: 0,
  fontSize: "14px",
}));

const ListItemTextRight = styled(() => (
  <Skeleton animation="wave" sx={{ width: "15%" }} />
))(({ theme }) => ({
  fontSize: "14px",
}));

export default function CartCardSkeleton({ isFull = true }) {
  return (
    <Card sx={{ width: "100%", minWidth: 345 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            gap: "16px",
            alignItems: "center",
            mb: "16px",
          }}
        >
          <Skeleton animation="wave" width={62} height={48} />
          <Box>
            <Skeleton animation="wave" sx={{ width: "120px" }} />
            <Skeleton animation="wave" sx={{ width: "60px" }} />
          </Box>
        </Box>
        <Divider />
        {isFull && (
          <>
            <List
              sx={{
                boxSizing: "content-box",
                mb: "16px",
                p: 0,
                transition: "max-height 0.5s ease",
                overflow: "visible",
              }}
            >
              <ListItem sx={{ mb: "-4px" }}>
                <ListItemTextLeft></ListItemTextLeft>
                <ListItemTextRight component={"div"}></ListItemTextRight>
              </ListItem>
              <ListItem sx={{ mb: "-4px" }}>
                <ListItemTextLeft></ListItemTextLeft>
                <ListItemTextRight component={"div"}></ListItemTextRight>
              </ListItem>
            </List>
            <Divider />
          </>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mt: "16px",
          }}
        >
          <Skeleton animation="wave" sx={{ width: "40%" }} />
          <Skeleton animation="wave" sx={{ width: "30%" }} />
        </Box>
      </CardContent>
    </Card>
  );
}
