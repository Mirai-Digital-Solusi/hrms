import BreadCrumb from '@/components/breadcrumb';
import { PegawaiClient } from '@/components/tables/pegawai-tables/client';
import { pegawais } from '@/constants/data';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Copy, Truck, MoreVertical } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";

const breadcrumbItems = [{ title: 'Pegawai', link: '/dashboard/pegawai' }];

export default function page() {
    return (
        <>
            <ScrollArea className="h-full">
                <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
                    <BreadCrumb items={breadcrumbItems} />
                    <ResizablePanelGroup
                        direction="horizontal"
                    >
                        <ResizablePanel defaultSize={100}>
                            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                                <PegawaiClient data={pegawais} />
                            </div>
                        </ResizablePanel>
                        <ResizableHandle withHandle className="m-8" />
                        <ResizablePanel defaultSize={50}>
                            <div>
                                <Card
                                    className="overflow-hidden" x-chunk="dashboard-05-chunk-4"
                                >
                                    <CardHeader className="flex flex-row items-start bg-muted/50">
                                        <div className="grid gap-0.5">
                                            <CardTitle className="group flex items-center gap-2 text-lg">
                                                Candice Schiner
                                                <Button
                                                    size="icon"
                                                    variant="outline"
                                                    className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                                                >
                                                    <Copy className="h-3 w-3" />
                                                    <span className="sr-only">Copy Pegawai ID</span>
                                                </Button>
                                            </CardTitle>
                                            <CardDescription>Mirai Digital Solusi</CardDescription>
                                        </div>
                                        {/* <div className="ml-auto flex items-center gap-1">
                                    <Button size="sm" variant="outline" className="h-8 gap-1">
                                        <Truck className="h-3.5 w-3.5" />
                                        <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                                            Track Order
                                        </span>
                                    </Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button size="icon" variant="outline" className="h-8 w-8">
                                                <MoreVertical className="h-3.5 w-3.5" />
                                                <span className="sr-only">More</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem>Export</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>Trash</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div> */}
                                    </CardHeader>
                                    <CardContent className="p-6 text-sm">
                                        <div className="grid gap-3">
                                            <div className="font-semibold">Informasi Umum</div>
                                            <dl className="grid gap-3">
                                                <div className="flex items-center justify-between">
                                                    <dt className="text-muted-foreground">Email</dt>
                                                    <dd>
                                                        <a href="mailto:">candice.schiner@mds.com</a>
                                                    </dd>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <dt className="text-muted-foreground">Phone</dt>
                                                    <dd>
                                                        <a href="tel:">+62 8129 8837 188</a>
                                                    </dd>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="grid gap-3">
                                                            <div className="text-muted-foreground">Alamat</div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div>Jl. Lorem No. 5, RT3/RW6, Malang, East Java, 10299</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </dl>
                                        </div>
                                        <Separator className="my-4" />
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="grid gap-3">
                                                <div className="font-semibold">Division</div>
                                                <div className="text-muted-foreground">
                                                    Technical Programmer
                                                </div>
                                            </div>
                                            <div className="grid auto-rows-max gap-3">
                                                <div className="font-semibold">Role</div>
                                                <div className="text-muted-foreground">
                                                    Frontend Developer
                                                </div>
                                            </div>
                                        </div>

                                        <Separator className="my-4" />
                                        <div className="grid gap-3">
                                            <div className="font-semibold">Riwayat Kerja</div>
                                            <dl className="grid gap-3">
                                                <div className="flex items-center justify-between">
                                                    <dt className="flex items-center gap-1 text-muted-foreground">
                                                        Tanggal Masuk
                                                    </dt>
                                                    <dd>November 23, 2022</dd>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <dt className="flex items-center gap-1 text-muted-foreground">
                                                        Status Pegawai
                                                    </dt>
                                                    <dd>PKWT</dd>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <dt className="flex items-center gap-1 text-muted-foreground">
                                                        Status PKWT
                                                    </dt>
                                                    <dd>12 Bulan</dd>
                                                </div>
                                            </dl>
                                        </div>

                                        <Separator className="my-4" />
                                        <div className="grid gap-3">
                                            <div className="font-semibold">Other Information</div>
                                            <dl className="grid gap-3">
                                                <div className="flex items-center justify-between">
                                                    <dt className="flex items-center gap-1 text-muted-foreground">
                                                        <CreditCard className="h-4 w-4" />
                                                        No. KTP
                                                    </dt>
                                                    <dd>3576014403910003</dd>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <dt className="flex items-center gap-1 text-muted-foreground">
                                                        <CreditCard className="h-4 w-4" />
                                                        Rekening
                                                    </dt>
                                                    <dd>4353542264</dd>
                                                </div>
                                            </dl>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                                        <div className="text-xs text-muted-foreground">
                                            Updated <time dateTime="2023-11-23">November 23, 2023</time>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </div>
            </ScrollArea>

        </>
    )
}