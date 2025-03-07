import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import { Button } from './ui/button'

export interface PaginationProps {
  pageIndex: number
  totalPages: number
  perPage: number
  onPageChange: (pageIndex: number) => void | Promise<void>
}

export function Pagination({
  pageIndex,
  totalPages,
  perPage,
  onPageChange,
}: PaginationProps) {
  const pages = Math.ceil(totalPages / perPage) || 1

  return (
    <div className="flex items-center justify-between">
      <span className="tex-sm text-muted-foreground">
        Total de {totalPages} item(s)
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          Página {pageIndex + 1} de {pages}
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => onPageChange(0)}
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={pageIndex === 0}
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">primeira página</span>
          </Button>
          <Button
            onClick={() => onPageChange(pageIndex - 1)}
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={pageIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">página anterior</span>
          </Button>
          <Button
            onClick={() => onPageChange(pageIndex + 1)}
            variant="outline"
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">próxima página</span>
          </Button>
          <Button
            onClick={() => onPageChange(pages - 1)}
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={pageIndex === pages - 1}
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">última página</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
