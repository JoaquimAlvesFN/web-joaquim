import React, { Fragment, memo, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from 'components/Layout/Toolbar';
import usePaginationObservable from 'hooks/usePagination';
import OrderService from 'services/order';
import CardLoader from 'components/Shared/CardLoader';
import ListItem from './ListItem';
// import { Button, CardContent, Grid, Table, TableBody, TableHead, TableRow } from '@material-ui/core';
import TableWrapper from 'components/Shared/TableWrapper';
import TableCellSortable from 'components/Shared/Pagination/TableCellSortable';
import EmptyAndErrorMessages from 'components/Shared/Pagination/EmptyAndErrorMessages';

const OrderListPage = memo(() => {
  const [params, mergeParams, loading, data, error, , refresh] = usePaginationObservable(
    params => OrderService.list(params),
    {},
    []
  );

  const handleCreate = useCallback(() => {
    alert('Feature futura...');
  }, []);

  const { results } = data || ({ total: 0, results: [] } as typeof data);

  return (
    <Fragment>
      <Toolbar title='Pedidos' />

      {/* <FormDialog opened={formOpened} user={current} onComplete={formCallback} onCancel={formCancel} /> */}

      <CardLoader show={loading} />

      <CardContent>
        <Grid container justify='space-between' alignItems='center' spacing={2}>
          <Grid item xs={12} sm={'auto'}>
            <Button fullWidth variant='contained' color='primary' onClick={handleCreate}>
              Novo Pedido
            </Button>
          </Grid>
        </Grid>
      </CardContent>

      <TableWrapper minWidth={500}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCellSortable
                paginationParams={params}
                disabled={loading}
                onChange={mergeParams}
                column='description'
              >
                Descrição
              </TableCellSortable>
              <TableCellSortable paginationParams={params} disabled={loading} onChange={mergeParams} column='quantity'>
                Quantidade
              </TableCellSortable>
              <TableCellSortable paginationParams={params} disabled={loading} onChange={mergeParams} column='price'>
                Preço
              </TableCellSortable>
            </TableRow>
          </TableHead>
          <TableBody>
            <EmptyAndErrorMessages
              colSpan={3}
              error={error}
              loading={loading}
              hasData={results.length > 0}
              onTryAgain={refresh}
            />
            {results.map(order => (
              <ListItem key={order.id} order={order} />
            ))}
          </TableBody>
        </Table>
      </TableWrapper>
    </Fragment>
  );
});

export default OrderListPage;
