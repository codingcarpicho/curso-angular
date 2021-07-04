export class DestinoViaje {
    private selected: boolean = false;
    constructor(public nombre: string, public u:string) { }
    isSelected(): boolean {
        return this.selected;
    }
    setSelected(s: boolean) {
        this.selected = s;
    }
}
