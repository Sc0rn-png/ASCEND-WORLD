import React from 'react';
import { Drop } from '../types';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface CatalogScreenProps {
  drops: Drop[];
  onSelectDrop: (id: string) => void;
}

export const CatalogScreen: React.FC<CatalogScreenProps> = ({ drops, onSelectDrop }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Drops & Projets</h2>
        <Badge variant="outline" className="font-mono">Saison 01</Badge>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {drops.map((drop) => (
          <Card key={drop.id} className="bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 transition-all">
            <CardHeader>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-mono text-neutral-500">#{drop.id}</span>
                <Badge variant={drop.status === 'live' ? 'default' : 'secondary'}>
                  {drop.status.toUpperCase()}
                </Badge>
              </div>
              <CardTitle className="text-xl">{drop.title}</CardTitle>
              <CardDescription className="text-neutral-400">{drop.description}</CardDescription>
            </CardHeader>

            <CardFooter className="flex justify-between items-center pt-4 border-t border-neutral-800/60">
              <span className="text-lg font-bold">{drop.price} €</span>
              <Button onClick={() => onSelectDrop(drop.id)}>
                Voir le projet
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
