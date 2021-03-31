import { Pipe, PipeTransform } from '@angular/core';
import { Ideia } from '../ideia/shared/ideia';

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
    transform(items: Ideia[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;
        
        searchText = searchText.toLowerCase();

        return items.filter(it => {
            return it.titulo.toLowerCase().includes(searchText);
        });
    }
}