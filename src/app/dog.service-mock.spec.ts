import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpRequestInterceptorMock } from "./http-request-interceptor.mock";
import { mockDog } from "./dog.service.spec";
import { AppComponent } from "./app.component";

describe('DogComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: HttpRequestInterceptorMock,
                    multi: true
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render image', async() => {
        const img: HTMLImageElement = fixture.debugElement.nativeElement.querySelector('img');
        expect(img).not.toBe(null);
        expect(mockDog.message === img.src).toBe(true);
    });
});
