'use client';

import React from 'react';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import type { ThanksCardWithFromTo } from '@/app/_repositories/ThanksCard';


type Props = {
  thanks_cards: ThanksCardWithFromTo[];
};

function ThanksCardList(props: Props) {
  const thanks_cards = props.thanks_cards;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>title</TableCell>
            <TableCell>body</TableCell>
            <TableCell>from</TableCell>
            <TableCell>to</TableCell>
            <TableCell>createdAt</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {thanks_cards?.map((thanks_card) => {
            return (

              <TableRow key={thanks_card.id}>
                <TableCell>{thanks_card.id}</TableCell>
                <TableCell>{thanks_card.title}</TableCell>
                <TableCell>{thanks_card.body}</TableCell>
                <TableCell>{thanks_card.from.name}</TableCell>
                <TableCell>{thanks_card.to.name}</TableCell>
                <TableCell>{thanks_card.createdAt?.toString()}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ThanksCardList;
