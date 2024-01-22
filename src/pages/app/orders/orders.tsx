import { Helmet } from 'react-helmet-async'

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { OrdersTableFilters } from './orders-table-filters'
import { OrdersTableRow } from './orders-table-row'

export function Orders() {
  return (
    <>
      <Helmet title="Pedidos" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tighter">Pedidos</h1>
      </div>
      <div className="space-y-2.5">
        <OrdersTableFilters />

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[64px]"></TableHead>
                <TableHead className="w-[140px]">Identificador</TableHead>
                <TableHead className="w-[180px]">Realizado há</TableHead>
                <TableHead className="w-[140px]">Status</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="w-[140px]">Total do pedido</TableHead>
                <TableHead className="w-[164px]"></TableHead>
                <TableHead className="w-[132px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, i) => (
                <OrdersTableRow key={i} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}

/*
  ANOTAÇÕES -----------------------------------------------------
  sr-only: (screen reader only) para tornar o elemento invisiível, para acessibilidade apenas fará a leitura.

*/
