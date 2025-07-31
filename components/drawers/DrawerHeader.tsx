'use client'
import { Drawer } from 'vaul';

interface DrawerHeaderProps {
  title: string;
  subtitle?: string;
  spotCount?: number;
}

export function DrawerHeader({ title, subtitle, spotCount }: DrawerHeaderProps) {
  return (
    <>
      <div aria-hidden className="mx-auto mt-4 w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-4" />
      <div className="flex flex-col w-full px-4">
        <Drawer.Title className="text-2xl font-medium text-gray-900">{title}</Drawer.Title>
        {subtitle && (
          <p className="text-sm mt-1 text-gray-600 mb-2">{subtitle}</p>
        )}
        {spotCount !== undefined && (
          <p className="text-sm mt-1 text-gray-600 mb-2">{spotCount} spots found</p>
        )}
      </div>
    </>
  );
}